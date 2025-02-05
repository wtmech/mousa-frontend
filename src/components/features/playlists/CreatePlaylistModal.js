'use client'

import { useState, useEffect, useRef } from 'react'
import { X, ToggleLeft, ToggleRight } from '@phosphor-icons/react'
import dynamic from 'next/dynamic'
import React from 'react'
import { playlistIcons } from '@/config/playlistIcons'
import html2canvas from 'html2canvas'

const HexColorPicker = dynamic(
  () => import('react-colorful').then(mod => mod.HexColorPicker),
  { ssr: false }
)

export default function CreatePlaylistModal({ isOpen, onClose, onCreate }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [color, setColor] = useState(null)
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [useIcon, setUseIcon] = useState(false)
  const [useOnlyColor, setUseOnlyColor] = useState(false)
  const [selectedIcon, setSelectedIcon] = useState('MusicNotes')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showIconPicker, setShowIconPicker] = useState(false)
  const [mounted, setMounted] = useState(false)
  const previewRef = useRef(null);

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!isOpen) {
      setName('')
      setDescription('')
      setColor(null)
      setShowColorPicker(false)
      setUseIcon(false)
      setUseOnlyColor(false)
      setSelectedIcon('MusicNotes')
      setSelectedCategory('All')
      setShowIconPicker(false)
    }
  }, [isOpen]);

  const capturePreview = async () => {
    if (!previewRef.current) return null;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 300;
    canvas.height = 300;

    // Draw background
    ctx.fillStyle = color || '#1A1A1A';
    ctx.beginPath();
    ctx.roundRect(0, 0, 300, 300, 12); // Rounded corners
    ctx.fill();

    // Draw content
    if (!useOnlyColor) {
      if (useIcon && playlistIcons[selectedIcon]) {
        // Draw icon (we'll need SVG handling)
        const Icon = playlistIcons[selectedIcon].icon;
        ctx.fillStyle = 'white';
        // Icon drawing logic here
      } else {
        // Draw text
        ctx.fillStyle = 'white';
        ctx.font = '60px Calistoga';
        ctx.textBaseline = 'top';

        // Word wrap text
        const words = (name || 'Playlist Name').split(' ');
        let line = '';
        let y = 24;

        for (let word of words) {
          const testLine = line + word + ' ';
          const metrics = ctx.measureText(testLine);

          if (metrics.width > 260 && line !== '') {
            ctx.fillText(line, 24, y);
            line = word + ' ';
            y += 70;
          } else {
            line = testLine;
          }
        }
        ctx.fillText(line, 24, y);
      }
    }

    return canvas.toDataURL('image/png');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      return;
    }

    const previewImage = await capturePreview();

    const playlistData = {
      name: name.trim(),
      description: description.trim(),
      icon: selectedIcon,
      useIcon,
      useOnlyColor,
      color: color || null,
      previewImage
    };

    await onCreate(playlistData);
  };

  if (!isOpen || !mounted) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-dark-header rounded-lg w-full max-w-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="h-5 w-5" weight="bold" />
        </button>

        <h2 className="text-xl font-semibold mb-6">Create New Playlist</h2>

        <form onSubmit={handleSubmit}>
          {/* Color Picker Section */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Theme color</label>
            <div className="relative">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setShowColorPicker(!showColorPicker)
                }}
                className="w-full bg-dark-main rounded-lg px-3 py-2 text-sm flex items-center space-x-2"
              >
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span>{color || 'Choose color'}</span>
              </button>
            </div>
          </div>

          {showColorPicker && (
            <>
              <div
                className="fixed inset-0"
                onClick={() => setShowColorPicker(false)}
              />
              <div
                className="absolute mt-2 z-50"
                onClick={e => e.stopPropagation()}
              >
                <HexColorPicker color={color || '#0D5EAF'} onChange={setColor} />
              </div>
            </>
          )}

          <div className="flex gap-6">
            {/* Left Column - Preview */}
            <div className="w-48 h-48 flex-shrink-0">
              <div
                ref={previewRef}
                className={`w-full h-full rounded-lg overflow-hidden relative ${
                  !color ? 'bg-dark-main' : ''
                }`}
                style={{ backgroundColor: color || undefined }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  {useOnlyColor ? (
                    <div className="w-full h-full" />
                  ) : useIcon ? (
                    React.createElement(playlistIcons[selectedIcon].icon, {
                      className: "h-12 w-12",
                      weight: "thin"
                    })
                  ) : (
                    <div className="w-full h-full flex items-start">
                      <h2 className="font-calistoga text-4xl overflow-wrap-anywhere text-left pl-2 pt-2">
                        {name || 'Playlist Name'}
                      </h2>
                    </div>
                  )}
                </div>
              </div>

              {/* Icon Picker Modal */}
              {showIconPicker && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                  <div className="bg-dark-header rounded-lg p-4 max-w-md w-full">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">Choose an icon</h3>
                      <button
                        onClick={() => setShowIconPicker(false)}
                        className="text-gray-400 hover:text-white"
                      >
                        <X className="h-5 w-5" weight="bold" />
                      </button>
                    </div>

                    <div className="mb-4">
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full bg-dark-main rounded px-2 py-1.5 text-sm"
                      >
                        <option value="All">All Categories</option>
                        {Array.from(new Set(Object.values(playlistIcons).map(i => i.category))).map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-6 gap-2 max-h-64 overflow-y-auto">
                      {Object.entries(playlistIcons)
                        .filter(([_, { category }]) => selectedCategory === 'All' || category === selectedCategory)
                        .map(([name, { icon: Icon }]) => (
                          <button
                            key={name}
                            onClick={() => {
                              setSelectedIcon(name)
                              setShowIconPicker(false)
                            }}
                            className={`p-3 rounded hover:bg-white/10 ${
                              selectedIcon === name ? 'bg-white/20' : ''
                            }`}
                          >
                            <Icon className="h-6 w-6" />
                          </button>
                        ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="flex-1 space-y-4">
              {/* Name & Description inputs */}
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value.slice(0, 30))}
                  className="w-full bg-dark-main rounded-lg px-3 py-2 text-lg font-medium focus:outline-none focus:ring-1 focus:ring-mousa"
                  placeholder="Playlist name"
                  maxLength={30}
                  required
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                  {name.length}/30
                </span>
              </div>

              <div>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-dark-main rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-mousa h-32 resize-none"
                  placeholder="Add an optional description"
                />
              </div>

              {/* Display Options */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setUseIcon(!useIcon)}
                  disabled={useOnlyColor}
                  className={`w-full flex items-center justify-between p-2 rounded-lg ${
                    useOnlyColor ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/[0.05]'
                  }`}
                >
                  <span className="text-sm">Use icon instead of text</span>
                  {useIcon ? (
                    <ToggleRight className="h-6 w-6 text-mousa" weight="fill" />
                  ) : (
                    <ToggleLeft className="h-6 w-6" weight="bold" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setUseOnlyColor(!useOnlyColor)
                    if (!useOnlyColor) setUseIcon(false)
                  }}
                  className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-white/[0.05]"
                >
                  <span className="text-sm">Use only color</span>
                  {useOnlyColor ? (
                    <ToggleRight className="h-6 w-6 text-mousa" weight="fill" />
                  ) : (
                    <ToggleLeft className="h-6 w-6" weight="bold" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-lg hover:bg-white/[0.05]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-mousa text-black rounded-lg hover:bg-mousa/90"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}