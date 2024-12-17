class ApiResponse extends Response {
  constructor(
    statusCode,
    data,
    message = 'Successful'
  ) {
    super(message)
    this.statusCode = statusCode
    this.success = statusCode < 400
    this.message = message
    this.data = data
  }
}

export default ApiResponse