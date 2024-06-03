namespace Skillfy.Server.ViewModel
{
    public class ResponsViewModel
    {
        public string Message { get; set; }

        public bool Status {  get; set; }

        public object Data { get; set; }
        public ResponsViewModel(bool success, string message, object data) 
        {
            Status = success;
            Message = message;
            Data = data;
        }

        /*public ResponsViewModel(bool success, string message, object data)
                {
                    Status = success;
                    Message = message;
                    Data = data;
                }*/
    }
}
