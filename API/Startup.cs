using API.Extensions;

namespace API
{
    public class Startup
    {
        private readonly IConfiguration _config;
        public Startup(IConfiguration config) // configuration to be injected into our startup class
        {
            _config = config;
           // Configuration = configuration;
        }

        //public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        // dependency injection container
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers();
            services.AddApplicationServices(_config);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        // if we want to add middleware it should be added here
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "WebAPIv5 v1"));
            }

          //  app.UseHttpsRedirection(); middleware

            app.UseRouting(); // middleware

            app.UseCors("CorsPolicy"); /// order is very important!!!

            app.UseAuthorization(); // middleware

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
