using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;

namespace PhoneBook.Utils;

public static class RestUtil
{
    private static  readonly HttpClient _httpClient = new HttpClient();

   
    public static void SetJwtAuthorization(string jwt)
    {
        if (string.IsNullOrWhiteSpace(jwt))
        {
            _httpClient.DefaultRequestHeaders.Authorization = null;
            return;
        }

        _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
    }

    public static async Task<T?> GetAsync<T>(string url)
    {
        using var response = await _httpClient.GetAsync(url).ConfigureAwait(false);
        response.EnsureSuccessStatusCode();
        var json = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
        return JsonSerializer.Deserialize<T>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
    }

    public static async Task<TResponse?> PostAsync<TRequest, TResponse>(string url, TRequest payload)
    {
        var jsonPayload = JsonSerializer.Serialize(payload);
        using var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");
        using var response = await _httpClient.PostAsync(url, content).ConfigureAwait(false);
        response.EnsureSuccessStatusCode();
        var json = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
        return JsonSerializer.Deserialize<TResponse>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
    }

    public static async Task<bool> DeleteAsync(string url)
    {
        using var response = await _httpClient.DeleteAsync(url).ConfigureAwait(false);
        return response.IsSuccessStatusCode;
    }

    public static async Task<TResponse?> PutAsync<TRequest, TResponse>(string url, TRequest payload)
    {
        var jsonPayload = JsonSerializer.Serialize(payload);
        using var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");
        using var response = await _httpClient.PutAsync(url, content).ConfigureAwait(false);
        response.EnsureSuccessStatusCode();
        var json = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
        return JsonSerializer.Deserialize<TResponse>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
    }
}
