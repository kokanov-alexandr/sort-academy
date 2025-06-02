namespace sort_academy_api.Models;

public class ConfirmEmailRequestDto
{
    public string Salt { get; set; }
    
    public string Code { get; set; }
    
}