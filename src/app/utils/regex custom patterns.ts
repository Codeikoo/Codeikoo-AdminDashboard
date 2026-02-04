// Define the regex for numbers and decimals
export const numberRegex: RegExp = /^\d+(\.\d+)?$/;

export const zipRegex: RegExp = new RegExp(/^[A-Za-z0-9\s-]{3,10}$/);

export const userNameRegex: RegExp = new RegExp(/^[A-Za-z\s'-]{2,}$/);

export const faxRegex: RegExp = new RegExp(
  /^(\+?\d{1,4}[-.\s]?)?(\(?\d{1,4}\)?[-.\s]?)?[\d\s-]{4,}$/
);

export const phoneNumberPattern: RegExp = new RegExp(
  /^\+?\d{1,4}?[\s.-]?\(?\d{1,4}?\)?[\s.-]?\d{1,4}[\s.-]?\d{1,4}[\s.-]?\d{1,9}$/
);

export const urlRegex =
  /^(https?:\/\/)?((([a-zA-Z\d]([a-zA-Z\d-]*[a-zA-Z\d])*)\.)+[a-zA-Z]{2,}|localhost|(\d{1,3}\.){3}\d{1,3})(:\d+)?(\/[-a-zA-Z\d%_.~+]*)*(\?[;&a-zA-Z\d%_.~+=-]*)?(#[a-zA-Z\d_]*)?$/;
