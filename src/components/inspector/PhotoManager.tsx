import React, { useState, useRef } from 'react';
import {
  ArrowLeft,
  Camera,
  Image as ImageIcon,
  X,
  Plus,
  ZoomIn,
  RotateCw,
  Download,
  Tag
} from 'lucide-react';
import { Property, Inspection } from '../../types';

interface PhotoManagerProps {
  property: Property;
  inspection: Inspection | null;
  onBack: () => void;
}

interface Photo {
  id: string;
  url: string;
  caption: string;
  isBeforePhoto: boolean;
  timestamp: string;
}

function PhotoManager({ property, inspection, onBack }: PhotoManagerProps) {
  const [photos, setPhotos] = useState<Photo[]>([
    {
      id: '1',
      url: 'https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg?auto=compress&cs=tinysrgb&w=400',
      caption: 'Electrical panel - main breaker',
      isBeforePhoto: true,
      timestamp: new Date().toISOString()
    },
    {
      id: '2',
      url: 'https://images.pexels.com/photos/834892/pexels-photo-834892.jpeg?auto=compress&cs=tinysrgb&w=400',
      caption: 'HVAC ductwork installation',
      isBeforePhoto: true,
      timestamp: new Date().toISOString()
    }
  ]);

  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [showModal, setShowModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoCapture = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            const newPhoto: Photo = {
              id: Date.now().toString() + Math.random(),
              url: e.target.result as string,
              caption: '',
              isBeforePhoto: true,
              timestamp: new Date().toISOString()
            };
            setPhotos(prev => [...prev, newPhoto]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const updatePhotoCaption = (id: string, caption: string) => {
    setPhotos(prev => prev.map(photo =>
      photo.id === id ? { ...photo, caption } : photo
    ));
  };

  const togglePhotoType = (id: string) => {
    setPhotos(prev => prev.map(photo =>
      photo.id === id ? { ...photo, isBeforePhoto: !photo.isBeforePhoto } : photo
    ));
  };

  const deletePhoto = (id: string) => {
    setPhotos(prev => prev.filter(photo => photo.id !== id));
    setShowModal(false);
    setSelectedPhoto(null);
  };

  const openPhotoModal = (photo: Photo) => {
    setSelectedPhoto(photo);
    setShowModal(true);
  };

  return (
    <div className="max-w-md mx-auto">
      {/* Header */}
      <div className="sticky top-16 bg-gray-50 dark:bg-gray-950 z-30 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
          >
            <ArrowLeft className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">Photo Manager</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">{photos.length} photos</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6 pb-16">
        {/* Camera Section */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handlePhotoCapture}
              className="flex items-center justify-center space-x-2 py-4 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors min-h-[56px]"
            >
              <Camera className="h-6 w-6" />
              <span className="font-medium">Take Photo</span>
            </button>
            <button
              onClick={handlePhotoCapture}
              className="flex items-center justify-center space-x-2 py-4 px-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl transition-colors min-h-[56px]"
            >
              <Plus className="h-6 w-6" />
              <span className="font-medium">Add Photo</span>
            </button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {/* Photos Grid */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="p-6 pb-4 border-b border-gray-100 dark:border-gray-800">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Inspection Photos</h3>
          </div>

          <div className="p-6">
            {photos.length > 0 ? (
              <div className="space-y-4">
                {photos.map((photo) => (
                  <div key={photo.id} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                    {/* Photo */}
                    <div className="relative">
                      <img
                        src={photo.url}
                        alt="Inspection photo"
                        className="w-full h-48 object-cover cursor-pointer"
                        onClick={() => openPhotoModal(photo)}
                      />
                      <button
                        onClick={() => openPhotoModal(photo)}
                        className="absolute top-3 right-3 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-colors"
                      >
                        <ZoomIn className="h-4 w-4" />
                      </button>
                      <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${
                        photo.isBeforePhoto
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {photo.isBeforePhoto ? 'BEFORE' : 'AFTER'}
                      </div>
                    </div>

                    {/* Photo Details */}
                    <div className="p-4 space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Caption
                        </label>
                        <input
                          type="text"
                          value={photo.caption}
                          onChange={(e) => updatePhotoCaption(photo.id, e.target.value)}
                          placeholder="Add a description for this photo..."
                          className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm min-h-[44px]"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => togglePhotoType(photo.id)}
                          className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors min-h-[40px] ${
                            photo.isBeforePhoto
                              ? 'bg-orange-50 text-orange-700 hover:bg-orange-100'
                              : 'bg-green-50 text-green-700 hover:bg-green-100'
                          }`}
                        >
                          <Tag className="h-4 w-4" />
                          <span>{photo.isBeforePhoto ? 'Mark as After' : 'Mark as Before'}</span>
                        </button>

                        <div className="flex space-x-2">
                          <button className="p-2 text-gray-500 hover:text-blue-600 transition-colors">
                            <Download className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deletePhoto(photo.id)}
                            className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(photo.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No photos yet</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Take photos to document your inspection findings.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Photo Modal */}
      {showModal && selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Photo Details</h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
              >
                <X className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <div className="p-4">
              <img
                src={selectedPhoto.url}
                alt="Inspection photo"
                className="w-full rounded-xl mb-4"
              />

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Caption
                  </label>
                  <input
                    type="text"
                    value={selectedPhoto.caption}
                    onChange={(e) => updatePhotoCaption(selectedPhoto.id, e.target.value)}
                    placeholder="Add a description..."
                    className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedPhoto.isBeforePhoto
                      ? 'bg-orange-100 text-orange-700'
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {selectedPhoto.isBeforePhoto ? 'BEFORE PHOTO' : 'AFTER PHOTO'}
                  </div>

                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(selectedPhoto.timestamp).toLocaleString()}
                  </div>
                </div>

                <div className="flex space-x-3 pt-2">
                  <button
                    onClick={() => togglePhotoType(selectedPhoto.id)}
                    className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors min-h-[48px]"
                  >
                    <Tag className="h-5 w-5" />
                    <span>{selectedPhoto.isBeforePhoto ? 'Mark as After' : 'Mark as Before'}</span>
                  </button>
                  <button
                    onClick={() => deletePhoto(selectedPhoto.id)}
                    className="flex items-center justify-center px-4 py-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors min-h-[48px]"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PhotoManager;