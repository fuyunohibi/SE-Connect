import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

const Event = () => {
    const localizer = momentLocalizer(moment);

    // Sample events data
    const events = [
        {
            title: 'Meeting 1',
            start: new Date(2023, 11, 1, 10, 0),
            end: new Date(2023, 11, 1, 12, 0),
        },
        {
            title: 'Meeting 2',
            start: new Date(2023, 11, 5, 14, 0),
            end: new Date(2023, 11, 5, 16, 0),
        },
        // Add more events as needed
    ];

    return (
        <section className="flex flex-col justify-center items-center bg-white p-4 md:p-8 max-w-screen-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Event Calendar</h1>
            <div style={{ height: 500 }}>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ margin: '20px' }}
                />
            </div>
        </section>
    );
};

export default Event;
