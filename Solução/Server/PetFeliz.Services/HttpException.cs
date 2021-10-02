using System;
using System.Net;

namespace PetFeliz.Services
{
    public class HttpException : Exception
    {
        public HttpStatusCode Status { get; set; }

        public HttpException(HttpStatusCode status, string message) : base(message)
        {
            this.Status = status;
        }

        public HttpException(HttpStatusCode status)
        {
            this.Status = status;
        }
    }
}