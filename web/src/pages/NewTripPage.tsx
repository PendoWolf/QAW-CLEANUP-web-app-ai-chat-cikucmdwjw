import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { daysBetween, today, trackEvent } from "../analytics/pendo";
import { tripsApi, type NewTrip } from "../api/trips";
import { TripForm } from "../components/TripForm";

/** Plans a new trip, then goes back to the trip list. */
export function NewTripPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const createTrip = async (trip: NewTrip) => {
    try {
      setError(null);
      const created = await tripsApi.create(trip);
      // A trip was saved: its destination, length, travelers and how far ahead it was planned.
      trackEvent("trip_created", {
        tripId: created.id,
        destination: trip.destination,
        travelers: trip.travelers,
        startDate: trip.startDate,
        endDate: trip.endDate,
        tripLengthDays: daysBetween(trip.startDate, trip.endDate) + 1,
        daysUntilStart: daysBetween(today(), trip.startDate),
      });
      navigate("/trips");
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return (
    <>
      <TripForm heading="Plan a trip" submitLabel="Add trip" onSubmit={createTrip} />
      {error && <p className="error">{error}</p>}
    </>
  );
}
