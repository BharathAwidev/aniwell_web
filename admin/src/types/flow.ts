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


export type OptionMeta = {
  depends_on_labels?: string[]
}

export type Option = {
  option_id?: number
  temp_id?: string
  label: string
  image_url?: string
  meta: OptionMeta
  variants: Variant[]     
}

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