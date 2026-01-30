
const HOST ="http://apitaskmgt.biyss.com";


export const getImagePath = (apiPath?: string): string => {
  if (!apiPath) return "";

  if (apiPath.startsWith("http")) {
    return apiPath;
  }

  return `${HOST}${apiPath}`;
}; 