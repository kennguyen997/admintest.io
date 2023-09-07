import { StringSchema } from 'yup'

declare module 'yup' {
  interface StringSchema<TType, TContext, TDefault, TFlags> {
    isHangulOrEnglish(errKrMsg: string): this;
  }
}
