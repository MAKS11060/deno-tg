export const serve = async (handler: (req: Request) => Promise<Response> | Response) => {
  throw new Error(`Current runtime: Workerd doesn't support serve`)
}
