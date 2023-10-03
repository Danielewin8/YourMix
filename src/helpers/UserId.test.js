import axios from 'axios';
import getUserId from './UserId';

jest.mock('axios');

describe('getUserId function', () => {
    it('should call axios.get with the correct URL', async () => {
        // Mocking a successful response from the Spotify API
        axios.get.mockResolvedValue({ data: { id: 'testUserId' } });

        // Mock the setToken function
        const setTokenMock = jest.fn();

        // Call the getUserId function
        await getUserId('testAccessToken', setTokenMock);

        expect(axios.get).toHaveBeenCalledWith('https://api.spotify.com/v1/me', {
            headers: {
                'Authorization': 'Bearer testAccessToken',
            },
        });
    });
});
