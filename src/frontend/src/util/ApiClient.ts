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

  public static async loadNextFormType() :Promise<FormType|null> {
    try {
      const response = (await fetch(`${this.API_ROOT}/formtype`, { method: 'GET' }));
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const data = await response.text();
      switch(data) {
        case "material": return FormType.MATERIAL;
        case "smart": return FormType.SMART;
        default: throw new Error(`Invalid form type: ${data}`)
      }
    } catch (error: any) {

      return null;
    }
  }
}