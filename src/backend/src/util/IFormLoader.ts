export default interface IFormloader {
  getForm(name: string): Promise<JSON>;
}