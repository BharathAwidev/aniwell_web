export type Variant = {
  id?: string
  label: string
  image_url?: string
}
export type NumberInputMode = "stepper" | "dropdown" | "fixed"

export type NumberUnit =
  | "ft"
  | "m"
  | "cm"
  | "mm"
  | "sqft"
  | "qty"

export type NumberMeta = {
  input_mode: NumberInputMode

  unit?: NumberUnit

  // Stepper mode
  min?: number
  max?: number
  step?: number

  // Dropdown mode
  values?: number[]

  // Fixed mode (optional future)
  fixed_value?: number
}

// TO DEL
// export type NumberFieldMeta = {
//   input_mode: "stepper" | "dropdown"
//   unit?: string

//   // Stepper mode
//   min?: number
//   max?: number
//   step?: number

//   // Dropdown mode
//   values?: number[]
// }

export type OptionMeta = {
  depends_on_labels?: string[]
}

export type Option = {
  option_id?: number
  temp_id?: string
  label: string
  image_url?: string
  meta: OptionMeta
  variants: Variant[]       // ✅ ENABLED
}

// export type Field = {
//   field_id?: number
//   label: string
//   type: "single_select" | "multi_select" | "number"
//   options: Option[]

//   number_meta?: NumberMeta     // ✅ ADD THIS
// }

export type FieldMeta = {
  depends_on_option_keys?: string[]
}

export type Field = {
  field_id?: number
  label: string
  type: "single_select" | "multi_select" | "number"

  /** Only relevant for non-number fields */
  enable_variants?: boolean

  options: Option[]

  /** Only for number fields */
  number_meta?: NumberMeta
  meta?: FieldMeta     
}

export type Step = {
  step_id?: number
  title: string
  fields: Field[]
}

export type Flow = {
  name: string
  type: "configurator" | "quiz" | "survey"
  steps: Step[]
}


// /* =========================================
//    FLOW CORE TYPES
// ========================================= */

// export type FieldType =
//   | "single_select"
//   | "multi_select"
//   | "number"

// /* -----------------------------------------
//    Number Field Configuration
// ----------------------------------------- */

// export type NumberFieldMeta = {
//   /** Display unit: ft, cm, qty, etc */
//   unit?: string

//   /** How user edits the value */
//   input_mode: "fixed" | "stepper" | "dropdown"

//   /** Range rules (for stepper) */
//   min?: number
//   max?: number
//   step?: number

//   /** Explicit values (for dropdown / fixed presets) */
//   values?: number[]

//   /** Default selected value */
//   default?: number
// }

// /* -----------------------------------------
//    Option Meta
// ----------------------------------------- */

// export type OptionMeta = {
//   price?: number

//   /** Dependency keys from previous step options */
//   depends_on_option_keys?: string[]

//   /** Room quantities (future) */
//   rooms?: Record<string, number>
// }

// /* -----------------------------------------
//    Option
// ----------------------------------------- */

// export type Option = {
//   option_id?: number
//   temp_id?: string
//   label: string
//   image_url?: string
//   meta: OptionMeta
// }

// /* -----------------------------------------
//    Field
// ----------------------------------------- */

// export type Field = {
//   field_id?: number
//   label: string
//   type: FieldType

//   /** Used only when type = number */
//   meta?: NumberFieldMeta

//   options: Option[]
// }

// /* -----------------------------------------
//    Step
// ----------------------------------------- */

// export type Step = {
//   step_id?: number
//   title: string
//   fields: Field[]
// }

// /* -----------------------------------------
//    Flow
// ----------------------------------------- */

// export type Flow = {
//   flow_id?: number
//   name: string
//   type: "configurator" | "quiz" | "survey"
//   steps: Step[]
// }
