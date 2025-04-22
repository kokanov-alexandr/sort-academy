using Microsoft.EntityFrameworkCore;
using sort_academy_api.Data.Context;
using sort_academy_api.Data.Repositories;
using sort_academy_api.Providers;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddDbContext<SortAcademyDbContext>(options =>
        options.UseSqlServer(builder.Configuration.GetConnectionString("SortAcademyConnection")));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowNextJsDev",  // ��� �������� CORS
        builder =>
        {
            builder.WithOrigins("http://localhost:3000", "http://10.23.28.26:3000") // ��������� ������� ������ � ����� ��������� (��� Next.js)
                   .AllowAnyMethod()                      // ��������� ����� HTTP ������ (GET, POST, PUT, DELETE, � �.�.)
                   .AllowAnyHeader();                     // ��������� ����� HTTP ���������
        });
});



builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});


builder.Services.AddMvc();
builder.Services.AddScoped<UserRepository>();
builder.Services.AddScoped<SortingRepository>();
builder.Services.AddScoped<TestRepositoryy>();
builder.Services.AddScoped<QuestionRepositoryy>();
builder.Services.AddScoped<AnswerOptionRepositoryy>();
builder.Services.AddScoped<MapperProvider>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseCors("AllowNextJsDev");

app.Run();
