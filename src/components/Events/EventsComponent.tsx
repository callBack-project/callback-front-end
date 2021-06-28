import { useReducer, useEffect } from 'react'
import axios from 'axios';
import EventsForm from './EventsForm'
import {eventDetailsReducer, ACTIONS, initialState} from './EventsReducer'

const EventsComponent = () => {
  const [state, dispatch] = useReducer(eventDetailsReducer, initialState);
  const { eventDetails, loading, error } = state;

  useEffect(() => {
    dispatch({ type: ACTIONS.GET_EVENTS });
    const getEvents = async () => {

      try {
        let response: any = await axios.get('http://localhost:8080/api/events');

        dispatch({ type: ACTIONS.SUCCESS, data: response.data });
        return;
      } catch (error) {
        dispatch({ type: ACTIONS.ERROR, error: error.message || error });
      }
    }
    getEvents();
  }, [])

  const postEventSubmitHandler = ( data: any) => {
    const postEvent = async () => {

      try {
        let response: any = await axios.post('http://localhost:8080/api/events', data);
        
        dispatch({ type: ACTIONS.ADD_EVENT, data: response.data });
      } catch (error) {
        dispatch({ type: ACTIONS.ERROR, error: error.message || error });
      }
  }
    postEvent()
  }

  return (
    <div>
      <h1>Events Component</h1>
      <EventsForm
        handleSubmit={postEventSubmitHandler}
      />
      {loading ? (
        <p>loading...</p>
      ) : error ? (
          <p>{error}</p>
        ) : (
            <ul>
              {eventDetails.map((event: any) => (
                <li key={event.id}>
                  <h1>{event.name}</h1>
                </li>
              ))}
            </ul>
      )}
    </div>
  ) 
}

export default EventsComponent