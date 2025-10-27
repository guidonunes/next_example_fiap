'use client';


import { useEffect, useRef } from "react";
import { FormState, submitReview } from "../actions";
import { useFormState } from "react-dom";
import { SubmitButton } from "./SubmitButton";

const initialFormState: FormState = {
  message: '',
  success: false
};


export function ReviewForm() {
  const [state, formAction] = useFormState(submitReview, initialFormState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if(state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <form ref={formRef} action={formAction} className="mt-6 p-4 border rounded-lg bg-white text-black shadow-sm">
      <h3 className="text-lg font-semibold mb-3  text-black">Write a review</h3>
      <div className="mb-3">
        <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
        <input type="text" name="author" id="author" required className="w-full p-2 border rounded-md text-black" />
        {state.errors?.author && (
          <p className="text-red-600 text-sm mt-1">{state.errors.author[0]}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
        <textarea name="review" id="review" rows={3} required className="w-full p-2 border rounded-md text-black"></textarea>
        {state.errors?.review && (
          <p className="text-red-600 text-sm mt-1">{state.errors.review[0]}</p>
        )}
      </div>
      <SubmitButton />

      {state.success && (
        <p className={`text-sm mt-2 ${state.success ? 'text-green-600' : 'text-red-600'}`}>
          {state.message}
        </p>
      )}
    </form>
  );
}
