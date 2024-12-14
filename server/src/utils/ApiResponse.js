class ApiResponse extends Response {
  constructor(
    statusCode,
    data,
    message = 'Successful'
  ) {
    this.statusCode = statusCode < 400
    this.success = true
    this.message = message
    this.data = data
  }
}

export default ApiResponse