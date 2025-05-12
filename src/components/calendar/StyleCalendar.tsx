
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar as CalendarIcon, Plus, Heart, X } from "lucide-react";

interface StyleEvent {
  id: string;
  date: Date;
  title: string;
  outfitId?: string;
  outfitName?: string;
}

const StyleCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<StyleEvent[]>([
    {
      id: '1',
      date: new Date(2025, 5, 15),
      title: 'Wedding Party',
      outfitId: 'outfit1',
      outfitName: 'Formal Summer Look'
    },
    {
      id: '2',
      date: new Date(2025, 5, 20),
      title: 'Beach Day',
      outfitId: 'outfit2',
      outfitName: 'Casual Beach Outfit'
    }
  ]);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');

  // Function to check if a date has events
  const hasEventOnDate = (date: Date) => {
    return events.some(event => 
      event.date.getDate() === date.getDate() && 
      event.date.getMonth() === date.getMonth() && 
      event.date.getFullYear() === date.getFullYear()
    );
  };

  // Get events for selected date
  const getEventsForDate = (date: Date) => {
    if (!date) return [];
    return events.filter(event => 
      event.date.getDate() === date.getDate() && 
      event.date.getMonth() === date.getMonth() && 
      event.date.getFullYear() === date.getFullYear()
    );
  };

  // Add new event
  const handleAddEvent = () => {
    if (newEventTitle.trim() && selectedDate) {
      const newEvent: StyleEvent = {
        id: `event-${Date.now()}`,
        date: selectedDate,
        title: newEventTitle
      };
      setEvents([...events, newEvent]);
      setNewEventTitle('');
      setIsAddingEvent(false);
    }
  };

  // Delete event
  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Style Calendar</h2>
        <Button 
          variant="outline" 
          onClick={() => {
            setIsAddingEvent(!isAddingEvent);
            if (!isAddingEvent) setNewEventTitle('');
          }}
        >
          {isAddingEvent ? <X className="h-4 w-4 mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
          {isAddingEvent ? 'Cancel' : 'Add Event'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="border-0 shadow-airbnb">
            <CardContent className="p-0">
              <div className="p-4">
                <Calendar 
                  mode="single" 
                  selected={selectedDate} 
                  onSelect={setSelectedDate} 
                  className="rounded-md border-0 pointer-events-auto"
                  modifiers={{
                    hasEvent: (date) => hasEventOnDate(date),
                  }}
                  modifiersStyles={{
                    hasEvent: { 
                      backgroundColor: 'rgb(255, 56, 92, 0.15)',
                      fontWeight: 'bold' 
                    }
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1">
          <Card className="border-0 shadow-airbnb h-full">
            <CardHeader>
              <CardTitle className="text-lg">
                {selectedDate ? (
                  <>Events on {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</>
                ) : (
                  <>Select a date</>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isAddingEvent && selectedDate && (
                <div className="mb-4 p-4 border border-dashed rounded-lg">
                  <h4 className="font-medium mb-2">Add New Event</h4>
                  <input
                    type="text"
                    placeholder="Event title"
                    className="w-full p-2 border rounded mb-2"
                    value={newEventTitle}
                    onChange={(e) => setNewEventTitle(e.target.value)}
                  />
                  <div className="flex justify-end">
                    <Button 
                      size="sm" 
                      onClick={handleAddEvent}
                      className="bg-styleklick-airbnb-pink hover:bg-styleklick-airbnb-red"
                    >
                      Add Event
                    </Button>
                  </div>
                </div>
              )}

              {selectedDate && getEventsForDate(selectedDate).length > 0 ? (
                <div className="space-y-3">
                  {getEventsForDate(selectedDate).map(event => (
                    <div key={event.id} className="p-3 border rounded-lg hover-lift">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{event.title}</h4>
                        <button 
                          onClick={() => handleDeleteEvent(event.id)}
                          className="text-styleklick-airbnb-gray-dark hover:text-styleklick-airbnb-pink"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      {event.outfitName && (
                        <div className="mt-2 flex items-center">
                          <Badge className="bg-styleklick-airbnb-pink text-white">
                            Outfit Selected
                          </Badge>
                          <span className="ml-2 text-sm">{event.outfitName}</span>
                        </div>
                      )}
                      {!event.outfitName && (
                        <Button size="sm" variant="outline" className="mt-2">
                          <Heart className="h-4 w-4 mr-2" />
                          Choose Outfit
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  {selectedDate ? (
                    <p className="text-styleklick-airbnb-gray-dark">No events on this date</p>
                  ) : (
                    <p className="text-styleklick-airbnb-gray-dark">Select a date to see events</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StyleCalendar;
