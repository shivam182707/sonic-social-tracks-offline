
import React from 'react';
import { Artist } from '../types/music';
import { Link } from 'react-router-dom';

interface ArtistCardProps {
  artist: Artist;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist }) => {
  return (
    <Link to={`/artist/${artist.id}`} className="artist-card group">
      <div className="relative overflow-hidden">
        <img 
          src={artist.imageUrl} 
          alt={artist.name} 
          className="w-full aspect-square object-cover rounded-full transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-full" />
      </div>
      <div className="mt-3 text-center">
        <h3 className="text-white text-sm font-medium truncate">{artist.name}</h3>
        <p className="text-spotify-lightgray text-xs">Artist</p>
      </div>
    </Link>
  );
};

export default ArtistCard;
