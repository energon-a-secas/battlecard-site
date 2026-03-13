export const ICONS = [
  { name: 'building-2',    label: 'Building'   },
  { name: 'scroll-text',   label: 'Scroll'     },
  { name: 'sword',         label: 'Sword'      },
  { name: 'swords',        label: 'Battle'     },
  { name: 'shield',        label: 'Shield'     },
  { name: 'shield-off',    label: 'Broken'     },
  { name: 'coins',         label: 'Coins'      },
  { name: 'gem',           label: 'Gem'        },
  { name: 'book-open',     label: 'Book'       },
  { name: 'scroll',        label: 'Quest'      },
  { name: 'zap',           label: 'Power'      },
  { name: 'flame',         label: 'Fire'       },
  { name: 'crown',         label: 'Crown'      },
  { name: 'trophy',        label: 'Trophy'     },
  { name: 'skull',         label: 'Skull'      },
  { name: 'crosshair',     label: 'Crosshair'  },
  { name: 'target',        label: 'Target'     },
  { name: 'map',           label: 'Map'        },
  { name: 'compass',       label: 'Compass'    },
  { name: 'flag',          label: 'Flag'       },
  { name: 'users',         label: 'Team'       },
  { name: 'user-check',    label: 'Champion'   },
  { name: 'bar-chart-2',   label: 'Stats'      },
  { name: 'trending-up',   label: 'Growth'     },
  { name: 'star',          label: 'Star'       },
  { name: 'sparkles',      label: 'Magic'      },
  { name: 'rocket',        label: 'Rocket'     },
  { name: 'cpu',           label: 'Tech'       },
  { name: 'lock',          label: 'Lock'       },
  { name: 'globe',         label: 'Globe'      },
  { name: 'lightbulb',     label: 'Idea'       },
  { name: 'briefcase',     label: 'Business'   },
];

export const ACCENT_COLORS = [
  '#0063e5', '#0284c7', '#0891b2', '#0d9488',
  '#059669', '#16a34a', '#65a30d', '#ca8a04',
  '#d97706', '#ea580c', '#dc2626', '#e11d48',
  '#db2777', '#9333ea', '#7c3aed', '#6366f1',
  '#475569', '#1e293b',
];

export function iconHtml(name, size = 18) {
  return `<i data-lucide="${name}" style="width:${size}px;height:${size}px;display:block;pointer-events:none;"></i>`;
}
