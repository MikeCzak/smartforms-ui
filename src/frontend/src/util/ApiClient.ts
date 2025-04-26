import { FormType } from "../FormType.js";

export default class ApiClient {

  private static API_ROOT: string = `${document.location.protocol}//${document.location.hostname}${document.location.hostname==='localhost' ? ':3000' : ''}/api`

  public static async loadFormData(formName: string) {
    try {
      const response = await fetch(`${this.API_ROOT}/formdata/${formName}`, { method: 'GET' });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      return response.json();
    } catch (error: any) {

      return null;
    }
  }

  public static async loadNextFormType() :Promise<{formtype: string, uuid: string}|null> {
    try {
      const response = (await fetch(`${this.API_ROOT}/formtype`, { method: 'GET' }));
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const data = await response.json();
      const { formtype, uuid } = data;
      switch(formtype) {
        case "material":
        case "smart": return {"formtype": formtype, "uuid": uuid};
        default: throw new Error(`Invalid form type: ${formtype}`)
      }
    } catch (error: any) {

      return null;
    }
  }

  public static async saveForm(jsonData: {[key: string]: any}, formType: string) {
    try {
      const response = await fetch(`${this.API_ROOT}/form/new/${formType}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      });

      if (!response.ok) {
        throw new Error(`Failed to submit form: ${response.statusText}`);
      }
      return true;

    } catch (error) {
      console.error('Error submitting form:', error);
    }
    return false;
  }
}