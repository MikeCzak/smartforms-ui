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

      console.log('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }
}