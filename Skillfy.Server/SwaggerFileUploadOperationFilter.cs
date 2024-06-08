using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace Skillfy.Server

{
    public class SwaggerFileUploadOperationFilter : IOperationFilter
    {
        public void Apply(OpenApiOperation operation, OperationFilterContext context)
        {
            var uploadFileParameters = context.MethodInfo.GetParameters()
                .Where(p => p.ParameterType == typeof(IFormFile) || p.ParameterType == typeof(IEnumerable<IFormFile>));

            if (uploadFileParameters.Any())
            {
                operation.Parameters.Clear();

                foreach (var parameter in uploadFileParameters)
                {
                    operation.Parameters.Add(new OpenApiParameter
                    {
                        Name = parameter.Name,
                        In = ParameterLocation.Query,
                        Schema = new OpenApiSchema { Type = "string" },
                        Required = false
                    });
                }

                operation.RequestBody = new OpenApiRequestBody
                {
                    Content = new System.Collections.Generic.Dictionary<string, OpenApiMediaType>
                    {
                        ["multipart/form-data"] = new OpenApiMediaType
                        {
                            Schema = new OpenApiSchema
                            {
                                Type = "object",
                                Properties = new System.Collections.Generic.Dictionary<string, OpenApiSchema>
                                {
                                    ["CourseName"] = new OpenApiSchema { Type = "string" },
                                    ["Description"] = new OpenApiSchema { Type = "string" },
                                    ["Thumbline"] = new OpenApiSchema { Type = "string", Format = "binary" },
                                    ["Chapters"] = new OpenApiSchema
                                    {
                                        Type = "array",
                                        Items = new OpenApiSchema
                                        {
                                            Type = "object",
                                            Properties = new System.Collections.Generic.Dictionary<string, OpenApiSchema>
                                            {
                                                ["Name"] = new OpenApiSchema { Type = "string" },
                                                ["Description"] = new OpenApiSchema { Type = "string" },
                                                ["Video"] = new OpenApiSchema { Type = "string", Format = "binary" }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                };
            }
        }
    }
}
