using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using PetFeliz.Services;
using System.Net;

namespace PetFeliz.Infrastructure
{
    public class HttpResponseFilter : IActionFilter, IOrderedFilter
    {
        public int Order { get; } = int.MaxValue - 10;

        public void OnActionExecuting(ActionExecutingContext context)
        {
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
            if (context.Exception != null)
            {
                var result = new ResultPadrao(true, context.Exception.Message);

                if (context.Exception is HttpException exception)
                {
                    context.Result = new ObjectResult(result)
                    {
                        StatusCode = (int)exception.Status
                    };
                }
                else
                {
                    context.Result = new ObjectResult(result)
                    {
                        StatusCode = (int)HttpStatusCode.InternalServerError
                    };
                }
                context.ExceptionHandled = true;
                return;
            }
            else
            {
                var response = context.Result as ObjectResult;
                var result = new ResultPadrao(response.Value);
                context.Result = new OkObjectResult(result);
            }
        }
    }

    public class ResultPadrao
    {
        public ResultPadrao(bool exception, string messageException)
        {
            Exception = exception;
            MessageException = messageException;
        }

        public ResultPadrao(object value)
        {
            Result = value;
        }

        public ResultPadrao()
        {
        }

        public bool Exception { get; set; }
        public string MessageException { get; set; } = "";
        public object Result { get; set; }
    }
}