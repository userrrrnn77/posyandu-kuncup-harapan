import { useEffect } from "react";
import type { UseFormReturn, FieldValues } from "react-hook-form";

export const useFormDraft = <
  TFieldValues extends FieldValues,
  TContext = unknown,
  TTransformedValues extends FieldValues | undefined = undefined,
>(
  form: UseFormReturn<TFieldValues, TContext, TTransformedValues>,
  key: string,
) => {
  useEffect(() => {
    const draft = sessionStorage.getItem(key);

    if (draft) {
      try {
        form.reset(JSON.parse(draft));
      } catch (error) {
        console.error("Gagal parse draft:", error);
      }
    }
  }, [form, key]);

  useEffect(() => {
    const subscription = form.watch((value) => {
      sessionStorage.setItem(key, JSON.stringify(value));
    });

    return () => subscription.unsubscribe();
  }, [form, key]);

  const clearDraft = () => {
    sessionStorage.removeItem(key);
  };

  return { clearDraft };
};
