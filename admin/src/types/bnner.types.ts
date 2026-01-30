export type AdditionalInfo = {
  text: string;
  isActive: boolean;
};

export type SlideType = "image" | "video";

// export type SlideFormValues = {
//   type: SlideType;
//   title: string;
//   subtitle: string;
//   description: string;
//   buttonText: string;
//   isActive: boolean;

//   fileName: string;
//   fileUrl: string;
//   fileSize: string;
//   fileType: string;

//   videoLength?: number;
//   additionalInfo: AdditionalInfo[];
// };

export type SlideFormValues = {
   id: "",
  type: SlideType;
  title: string;
  caption: string;
  description: string;
  buttonText: string;
  file?: File | null;
  fileUrl?: string;
  videoLength?: number;
  additionalInfo: AdditionalInfo[];
  isActive: boolean;
  additionalInfoInput: string;
  showBookConsultation: boolean;

};
export type Slide = SlideFormValues & {
  id: number;
  sortOrder: number;
};



// export type AdditionalInfo = {
//   text: string;
//   isActive: boolean;
// };

// export type SlideFormValues = {
//   id?: number;
//   type: "image" | "video";
//   title: string;
//   caption: string;
//   description: string;
//   video_length?: number;
//   additionalInfo: AdditionalInfo[];
//   isActive: boolean;
//   showBookConsultation: boolean;
//   buttonText: string;
//   file?: File | null;
// };