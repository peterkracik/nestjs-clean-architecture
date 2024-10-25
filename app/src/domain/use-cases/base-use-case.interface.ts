export interface BaseUseCase {
  /**
   * The entry point for every use case
   * @param args
   *     The parameters which should be passed to the actual execute method
   */
  execute(...args: unknown[]): Promise<unknown>;
}
