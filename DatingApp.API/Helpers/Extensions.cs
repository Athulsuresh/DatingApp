using System;
using Microsoft.AspNetCore.Http;

namespace DatingApp.API.Helpers
{
    public  static class Extensions
    {
        public static void AddApplicationError(this HttpResponse response, string message)
        {
            response.Headers.Add("Application-Error", message);
            response.Headers.Add("Access-Control-Expose-Headers", "Application-Error");
            response.Headers.Add("AAccess-Control-Allow-Origin", "*" );


        }

        public static int CalculateAge(this DateTime thedate)
        {
            var age = DateTime.Today.Year -thedate.Year;
            if(thedate.AddYears(age) > DateTime.Today)
            {
                age--;
            }
            return age;
        }
    }
}