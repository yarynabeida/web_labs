import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import NotesStatisitics from '../notes-statistics';
import Login from '../login';
import { act } from 'react-dom/test-utils';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();
const successResponse = 200;

describe('Note-Statistics page', () => {

    let token = { 'token': 'dGVzdDp0ZXN0' };
    let id = { 'id': 7 };

    const dataNote = { notes:
        {
            note : {
                id: 5,
                idOwner: 7,
                idTag: 1,
                name: 'note',
                text: 'my first note on the service',
            },
            statistic: {
                id: 6,
                noteId: 5,
                userId: 7,
                time: '2022-05-31',
            }
        },
    };

    beforeAll(() => {
        global.Storage.prototype.setItem = jest.fn((key, value) => {
            token[key] = value;
        });
        global.Storage.prototype.setItem = jest.fn((key, value) => {
            id[key] = value;
        });
        global.Storage.prototype.getItem = jest.fn((key) => token[key]);
        global.Storage.prototype.getItem = jest.fn((key) => id[key]);
    });

    afterAll(() => {
        global.Storage.prototype.setItem.mockReset();
        global.Storage.prototype.getItem.mockReset();
    });

    it('test note-statistics page', async () => {
        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async () => {
            fetch.mockReturnValue(Promise.resolve(new Response(successResponse)));
            render(<Router><NotesStatisitics/></Router>);
        });

        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue(),
            status: 200,
          });

        // render(<Router><NotesStatisitics/></Router>);
        expect(screen.getAllByText(/Notes Statistics/i)).toBeTruthy();

        const logoutButton = screen.getAllByTestId("logout");
        fireEvent.click(logoutButton[0]);
        render(<Router><Login/></Router>);
        expect(screen.getAllByText(/log in/i)).toBeTruthy();
    })

    it('renders note-statistics page', async () => {
        
        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async () => {
            
            fetch.mockReturnValue(Promise.resolve(new Response(successResponse)));
            render(<Router><NotesStatisitics/></Router>);
        });

        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue(dataNote),
            status: 200,
          });

          await expect(fetch)
          .toHaveBeenCalledTimes(1);
    })

});