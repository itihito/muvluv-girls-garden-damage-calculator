import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './ui/dialog';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Rating } from './Rating';
import { cn } from '../lib/utils';
import { getSkillPowerAtLevel } from '../utils/damageCalculator';
import { characters } from '../characterData';
import type { Character, Skill, AttributeType } from '../types';

interface SkillSelectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSkillPowerSelect: (power: number, hitCount: number) => void;
}

export const SkillSelectionDialog: React.FC<SkillSelectionDialogProps> = ({
  isOpen,
  onClose,
  onSkillPowerSelect,
}) => {
  const { t } = useTranslation();
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [skillLevel, setSkillLevel] = useState<number>(1);
  const [selectedAttributeFilter, setSelectedAttributeFilter] = useState<AttributeType | 'all'>('all');

  // スキルタイプごとの色設定
  const getSkillTypeColor = (skillType: string) => {
    const colorMap: Record<string, string> = {
      'EX': 'bg-orange-500 text-white',
      'AS': 'bg-blue-500 text-white',
      'PS': 'bg-green-500 text-white',
    };
    return colorMap[skillType] || 'bg-gray-500 text-white';
  };

  // 属性翻訳キー取得
  const getAttributeTranslationKey = (attribute: AttributeType | 'all'): string => {
    const attributeKeyMap: Record<AttributeType | 'all', string> = {
      'all': 'all',
      'アグレッシブ': 'aggressive',
      'スマート': 'smart',
      'シャイ': 'shy',
      'キュート': 'cute',
      'コミカル': 'comical',
      'クレバー': 'clever',
    };
    return attributeKeyMap[attribute] || 'all';
  };

  // フィルタリングされたキャラクター
  const filteredCharacters = characters.filter((char: Character) =>
    selectedAttributeFilter === 'all' || char.attribute === selectedAttributeFilter
  );

  // 現在の威力を計算
  const getCurrentSkillPower = () => {
    if (!selectedSkill) return 0;
    return getSkillPowerAtLevel(selectedSkill, skillLevel);
  };

  // 決定ボタンハンドラー
  const handleConfirm = () => {
    const power = getCurrentSkillPower();
    const hitCount = selectedSkill?.hit_count;
    if (power > 0 && hitCount) {
      onSkillPowerSelect(power, hitCount);
    }
  };

  // リセット
  const handleReset = () => {
    setSelectedCharacter(null);
    setSelectedSkill(null);
    setSkillLevel(1);
    setSelectedAttributeFilter('all');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>キャラクタースキルから威力を選択</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* 属性フィルター */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">属性フィルター</h3>
            <div className="flex flex-wrap gap-2">
              {(['all', 'アグレッシブ', 'スマート', 'シャイ', 'キュート', 'コミカル', 'クレバー'] as const).map((attr) => (
                <Button
                  key={attr}
                  variant={selectedAttributeFilter === attr ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedAttributeFilter(attr)}
                  className="text-sm"
                >
                  {t(`character.filter.${getAttributeTranslationKey(attr)}`)}
                </Button>
              ))}
            </div>
          </div>

          {/* キャラクター選択 */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">キャラクター選択</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-40 overflow-y-auto">
              {filteredCharacters.map((character: Character, index: number) => (
                <Card
                  key={`${character.name}-${index}`}
                  className={cn(
                    'cursor-pointer transition-all hover:scale-105',
                    selectedCharacter?.name === character.name
                      ? 'ring-2 ring-primary bg-primary/5'
                      : 'hover:shadow-md'
                  )}
                  onClick={() => {
                    setSelectedCharacter(character);
                    setSelectedSkill(null);
                    setSkillLevel(1);
                  }}
                >
                  <CardContent className="p-3">
                    <div className="text-center space-y-2">
                      <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium">{character.name}</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm truncate">{character.name}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {t(`character.filter.${getAttributeTranslationKey(character.attribute as AttributeType)}`)}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* スキル選択 */}
          {selectedCharacter && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">スキル選択</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedCharacter.skills.filter(skill => skill.hit_count).map((skill: Skill, skillIndex: number) => (
                  <Card
                    key={`${skill.name}-${skillIndex}`}
                    className={cn(
                      'cursor-pointer transition-all hover:scale-105',
                      selectedSkill?.name === skill.name
                        ? 'ring-2 ring-primary bg-primary/5'
                        : 'hover:shadow-md'
                    )}
                    onClick={() => setSelectedSkill(skill)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">{skill.name}</CardTitle>
                        <Badge className={getSkillTypeColor(skill.skill_type)} variant="secondary">
                          {skill.skill_type}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <p>威力: {skill.power_per_level[0]}-{skill.power_per_level[14]}</p>
                        {skill.hit_count && <p>ヒット数: {skill.hit_count}</p>}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* スキルレベル選択 */}
          {selectedSkill && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">スキルレベル選択</h3>
              <Rating
                value={skillLevel}
                onChange={setSkillLevel}
                max={15}
                showLabel={true}
                label="スキルレベル"
              />

              {/* 現在の設定表示 */}
              <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                <h4 className="font-medium text-sm">選択中の設定</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">キャラクター:</span>
                    <span className="font-medium">{selectedCharacter?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">スキル:</span>
                    <span className="font-medium">{selectedSkill.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">レベル:</span>
                    <span className="font-medium">{skillLevel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">威力:</span>
                    <span className="font-medium text-primary">{getCurrentSkillPower()}</span>
                  </div>
                  {selectedSkill.hit_count && (
                    <div className="flex justify-between col-span-2">
                      <span className="text-muted-foreground">ヒット数:</span>
                      <span className="font-medium">{selectedSkill.hit_count}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleReset}>
            リセット
          </Button>
          <Button variant="outline" onClick={onClose}>
            キャンセル
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!selectedSkill || getCurrentSkillPower() === 0}
          >
            決定（威力: {getCurrentSkillPower()}）
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};