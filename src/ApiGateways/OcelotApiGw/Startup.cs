using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Ocelot.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Ocelot.Cache.CacheManager;
using Ocelot.Middleware;
using OcelotApiGw.Options;

namespace OcelotApiGw
{
    public class Startup
    {
        private readonly IConfiguration configuration;

        public Startup(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddOcelot()
                .AddCacheManager(x => x.WithDictionaryHandle());
            
            var corsOptions = configuration.GetSection("CorsOptions").Get<CorsOptions>();
            services.AddCors(options =>
            {
                options.AddPolicy(corsOptions.PolicyName,
                    builder =>
                    {
                        builder.WithOrigins(corsOptions.AllowedOrigins)
                            .WithHeaders(corsOptions.AllowedHeaders)
                            .WithMethods(corsOptions.AllowedMethods);
                    });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public async void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            var corsOptions = configuration.GetSection("CorsOptions").Get<CorsOptions>();
            app.UseCors(corsOptions.PolicyName);

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapGet("/", async context => { await context.Response.WriteAsync("Hello World!"); });
            });

            await app.UseOcelot();
        }
    }
}