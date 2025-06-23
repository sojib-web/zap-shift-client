// @ts-nocheck
import React, { useMemo, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Fly animation component
const FlyToDistrict = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 10, { duration: 2 });
    } else {
      // Fly back to default center and zoom if no position
      map.flyTo([23.8103, 90.4125], 7, { duration: 2 });
    }
  }, [position, map]);

  return null;
};

const DistrictMap = ({ serviceDataMap, searchTerm }) => {
  const defaultCenter = [23.8103, 90.4125];
  const defaultZoom = 6;

  const filteredMarkers = useMemo(() => {
    if (!searchTerm.trim()) return serviceDataMap;

    const term = searchTerm.toLowerCase();
    return serviceDataMap.filter((item) => {
      return (
        item.city?.toLowerCase().includes(term) ||
        item.region?.toLowerCase().includes(term) ||
        item.district?.toLowerCase().includes(term) ||
        item.covered_area?.some((area) => area.toLowerCase().includes(term))
      );
    });
  }, [searchTerm, serviceDataMap]);

  const firstMatchPosition =
    filteredMarkers.length > 0
      ? [filteredMarkers[0].latitude, filteredMarkers[0].longitude]
      : null;

  return (
    <>
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        scrollWheelZoom={false}
        style={{ height: "350px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FlyToDistrict position={firstMatchPosition} />

        {filteredMarkers.map((item, index) => (
          <Marker key={index} position={[item.latitude, item.longitude]}>
            <Popup>
              <strong>{item.city}</strong>
              <br />
              Areas: {item.covered_area?.join(", ")}
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* No results message */}
      {filteredMarkers.length === 0 && (
        <p className="text-center mt-4 text-red-600 font-semibold">
          No results found for "{searchTerm}"
        </p>
      )}
    </>
  );
};

export default DistrictMap;
