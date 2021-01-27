import { checkPerKey } from 'bueno';
import type { Schema } from 'bueno';
import { writable, derived, get } from 'svelte/store';
import type { Readable, Writable } from 'svelte/store';
import type { MessageRenderer, MessageBuilder } from 'bueno/locale';

export interface FormConfig<D extends Record<string, unknown>, R = D> {
  initialValues: D;
  bueno?: Schema<D, R>;
  validate?: (values: D) => Errors<D>;
  onSubmit: (values: D) => Promise<void> | void;
  locale?: {
    renderer: MessageRenderer<any, any>;
    builder: MessageBuilder<any>;
  };
}

export declare type Errors<Values> = {
  [K in keyof Values]?: Values[K] extends any[]
    ? Values[K][number] extends Record<string, unknown>
      ? Errors<Values[K][number]>[] | string | string[]
      : string | string[]
    : Values[K] extends Record<string, unknown>
    ? Errors<Values[K]>
    : string;
};

type Touched<D extends Record<string, unknown>> = {
  [key in keyof D]: boolean;
};

type FormAction = (node: HTMLFormElement) => { destroy: () => void };

export interface Form<D extends Record<string, unknown>> {
  form: FormAction;
  data: Writable<D>;
  errors: Readable<Errors<D>>;
  touched: Writable<Touched<D>>;
  handleSubmit: (e: Event) => void;
  isValid: Readable<boolean>;
  isSubmitting: Writable<boolean>;
}

function isInputElement(el: EventTarget): el is HTMLInputElement {
  return (el as HTMLInputElement)?.tagName === 'INPUT';
}

function isTextAreaElement(el: EventTarget): el is HTMLTextAreaElement {
  return (el as HTMLTextAreaElement)?.tagName === 'TEXTAREA';
}

export function createForm<D extends Record<string, unknown>>(
  config: FormConfig<D>
): Form<D> {
  const initialTouched = Object.keys(config.initialValues).reduce(
    (acc, key) => ({
      ...acc,
      [key]: false,
    }),
    {} as Touched<D>
  );

  const touched = writable(initialTouched);

  const { subscribe, set, update } = writable({ ...config.initialValues });

  function newDataSet(values: D) {
    touched.update((current) => {
      const untouchedKeys = Object.keys(current).filter((key) => !current[key]);
      return untouchedKeys.reduce(
        (acc, key) => ({
          ...acc,
          [key]: values[key] !== config.initialValues[key],
        }),
        current
      );
    });
    return set(values);
  }

  const errors = derived({ subscribe }, ($data) => {
    let errors: Errors<D> = {};
    if (config.validate) errors = config.validate($data);
    if (config.bueno) {
      errors = checkPerKey<D, D>({ ...$data }, config.bueno, config.locale);
    }
    return errors;
  });

  const { subscribe: errorSubscribe } = derived(
    [errors, touched],
    ([$errors, $touched]) => {
      return Object.keys($errors).reduce(
        (acc, key) => ({
          ...acc,
          ...($touched[key] && { [key]: $errors[key] }),
        }),
        {} as Errors<D>
      );
    }
  );

  const isValid = derived([errors, touched], ([$errors, $touched]) => {
    if (!config.validate && !config.bueno) return true;
    const formTouched = Object.keys($touched).some((key) => $touched[key]);
    const hasErrors = Object.keys($errors).some((key) => !!$errors[key]);
    if (!formTouched || hasErrors) return false;
    return true;
  });

  const isSubmitting = writable(false);

  async function handleSubmit(event: Event) {
    isSubmitting.set(true);
    event.preventDefault();
    touched.update((t) => {
      return Object.keys(t).reduce(
        (acc, key) => ({
          ...acc,
          [key]: true,
        }),
        t
      );
    });
    if (Object.keys(get(errors)).length !== 0) return;
    await config.onSubmit(get({ subscribe }));
    isSubmitting.set(false);
  }

  function form(node: HTMLFormElement) {
    function setCheckboxValues(target: HTMLInputElement) {
      const checkboxes = node.querySelectorAll(`[name=${target.name}]`);
      if (checkboxes.length === 1)
        return update((data) => ({ ...data, [target.name]: target.checked }));
      return update((data) => ({
        ...data,
        [target.name]: Array.from(checkboxes)
          .filter((el: HTMLInputElement) => el.checked)
          .map((el: HTMLInputElement) => el.value),
      }));
    }

    function setRadioValues(target: HTMLInputElement) {
      const radios = node.querySelectorAll(`[name=${target.name}]`);
      const checkedRadio = Array.from(radios).find(
        (el) => isInputElement(el) && el.checked
      ) as HTMLInputElement | undefined;
      update((data) => ({ ...data, [target.name]: checkedRadio?.value }));
    }

    for (const el of node.elements) {
      if ((!isInputElement(el) && !isTextAreaElement(el)) || !el.name) continue;
      const initialValue = config.initialValues[el.name];
      if (isInputElement(el) && el.type === 'checkbox') {
        if (typeof initialValue === 'boolean') {
          el.checked = initialValue;
        } else if (Array.isArray(initialValue)) {
          el.checked = initialValue.includes(el.value);
        }
        continue;
      }
      if (isInputElement(el) && el.type === 'radio') {
        el.checked = initialValue === el.value;
        continue;
      }
      el.value = String(initialValue);
    }

    function handleInput(e: InputEvent) {
      const target = e.target;
      if (!isInputElement(target) && !isTextAreaElement(target)) return;
      if (target.type === 'checkbox' || target.type === 'radio') return;
      if (!target.name) return;
      update((data) => ({
        ...data,
        [target.name]: target.type.match(/^(number|range)$/)
          ? +target.value
          : target.value,
      }));
    }

    function handleChange(e: Event) {
      const target = e.target;
      if (!isInputElement(target)) return;
      if (!target.name) return;
      if (target.type === 'checkbox') setCheckboxValues(target);
      if (target.type === 'radio') setRadioValues(target);
    }
    function handleBlur(e: Event) {
      const target = e.target;
      if (!isInputElement(target) && !isTextAreaElement(target)) return;
      if (!target.name) return;
    }

    node.addEventListener('input', handleInput);
    node.addEventListener('change', handleChange);
    node.addEventListener('focusout', handleBlur);

    return {
      destroy() {
        node.removeEventListener('input', handleInput);
        node.removeEventListener('change', handleChange);
        node.removeEventListener('foucsout', handleBlur);
      },
    };
  }

  return {
    form,
    data: { subscribe, set: newDataSet, update },
    errors: { subscribe: errorSubscribe },
    touched,
    handleSubmit,
    isValid,
    isSubmitting,
  };
}