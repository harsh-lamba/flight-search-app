export default class Logger {
  public static error(title = "Error") {
    throw new Error(title);
  }
}
