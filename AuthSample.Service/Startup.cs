using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace AuthSample.Service
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add the Auth0 Settings object so it can be injected
            services.Configure<Auth0Settings>(Configuration.GetSection("Auth0"));
            // add CORS support
            // services.AddCors();
            services.AddCors(options =>
            {
                options.AddPolicy("AllowNgClient",
                    builder => builder
                        .WithOrigins("http://localhost:4200")
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials());
            });
            // Add framework services.
            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app,
            IHostingEnvironment env,
            ILoggerFactory loggerFactory,
            IOptions<Auth0Settings> auth0Settings)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseBrowserLink();
            }
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.MapWhen(context =>
            {
                var path = context.Request.Path.Value;
                if (path.Contains("/api/")) return false;
                return (!path.Contains("."));
            }, aBranch =>
            {
                aBranch.Use((context, next) =>
                {
                    context.Request.Path = new PathString("/index.html");
                    return next();
                });
                aBranch.UseStaticFiles();
            });
            // Cors
            // app.UseCors(builder =>
            // builder.WithOrigins("http://example.com")
            //     .AllowAnyHeader()
            // );
            // JWT
            var options = new JwtBearerOptions
            {
                Audience = auth0Settings.Value.ClientId,
                Authority = $"https://{auth0Settings.Value.Domain}/"
            };
            app.UseJwtBearerAuthentication(options);
            //
            app.UseMvc();
        }
    }
}
