import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { cn } from '../lib/utils';
import { characters } from '../characterData';
import type { Character, AttributeType } from '../types';

interface CharacterSelectorProps {
  selectedCharacter: Character | null;
  onSelectCharacter: (character: Character) => void;
  attributeFilter: AttributeType | 'all';
  onAttributeFilterChange: (filter: AttributeType | 'all') => void;
  className?: string;
}

export const CharacterSelector: React.FC<CharacterSelectorProps> = ({
  selectedCharacter,
  onSelectCharacter,
  attributeFilter,
  onAttributeFilterChange,
  className = '',
}) => {
  const { t } = useTranslation();

  // 属性フィルターに基づいてキャラクターをフィルタリング
  const filteredCharacters = characters.filter((character) => {
    if (attributeFilter === 'all') return true;
    return character.attribute === attributeFilter;
  });

  // 属性ごとの色設定
  const getAttributeColor = (attribute: string) => {
    const colorMap: Record<string, string> = {
      'アグレッシブ': 'bg-red-500',
      'スマート': 'bg-blue-500',
      'シャイ': 'bg-green-500',
      'キュート': 'bg-pink-500',
      'コミカル': 'bg-yellow-500',
      'クレバー': 'bg-purple-500',
    };
    return colorMap[attribute] || 'bg-gray-500';
  };

  // レア度ごとの色設定
  const getRarityColor = (rarity: string) => {
    const colorMap: Record<string, string> = {
      'SSR': 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-yellow-100',
      'SR': 'border-purple-400 bg-gradient-to-br from-purple-50 to-purple-100',
      'R': 'border-blue-400 bg-gradient-to-br from-blue-50 to-blue-100',
    };
    return colorMap[rarity] || 'border-gray-300';
  };

  const attributeList: (AttributeType | 'all')[] = [
    'all',
    'アグレッシブ',
    'スマート',
    'シャイ',
    'キュート',
    'コミカル',
    'クレバー',
  ];

  return (
    <div className={cn('space-y-4', className)}>
      <div>
        <h2 className="text-lg font-semibold mb-3">{t('character.title')}</h2>

        {/* 属性フィルタータブ */}
        <Tabs value={attributeFilter} onValueChange={(value) => onAttributeFilterChange(value as AttributeType | 'all')} className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
            {attributeList.map((attr) => (
              <TabsTrigger
                key={attr}
                value={attr}
                className="text-xs px-2 py-1"
              >
                {attr === 'all' ? t('character.filter.all') : t(`character.filter.${attr.toLowerCase()}`)}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* キャラクター一覧 */}
          <TabsContent value={attributeFilter} className="mt-4">
            {filteredCharacters.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {t('character.noSelection')}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
                {filteredCharacters.map((character) => {
                  const isSelected = selectedCharacter?.name === character.name;

                  return (
                    <Card
                      key={character.name}
                      className={cn(
                        'cursor-pointer transition-all duration-200 hover:shadow-md',
                        getRarityColor(character.rarity),
                        {
                          'ring-2 ring-primary shadow-lg': isSelected,
                          'hover:scale-105': !isSelected,
                        }
                      )}
                      onClick={() => onSelectCharacter(character)}
                    >
                      <CardContent className="p-3">
                        {/* キャラクター名 */}
                        <div className="font-medium text-sm mb-2 line-clamp-2 min-h-[2.5rem]">
                          {character.name}
                        </div>

                        {/* キャラクター情報 */}
                        <div className="space-y-2">
                          {/* レア度と属性 */}
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="secondary"
                              className={cn(
                                'text-xs font-bold',
                                character.rarity === 'SSR' && 'bg-yellow-500 text-white',
                                character.rarity === 'SR' && 'bg-purple-500 text-white',
                                character.rarity === 'R' && 'bg-blue-500 text-white'
                              )}
                            >
                              {character.rarity}
                            </Badge>
                            <div className="flex items-center gap-1">
                              <div
                                className={cn(
                                  'w-2 h-2 rounded-full',
                                  getAttributeColor(character.attribute)
                                )}
                              />
                              <span className="text-xs text-muted-foreground">
                                {character.attribute}
                              </span>
                            </div>
                          </div>

                          {/* 学校とチーム */}
                          <div className="text-xs text-muted-foreground space-y-1">
                            <div className="flex justify-between">
                              <span>{t('character.school')}:</span>
                              <span>{character.school}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>{t('character.team')}:</span>
                              <span className="truncate ml-1">{character.team}</span>
                            </div>
                          </div>

                          {/* スキル数 */}
                          <div className="text-xs text-muted-foreground">
                            スキル: {character.skills.length}個
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CharacterSelector;