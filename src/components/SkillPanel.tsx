import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Rating } from './Rating';
import { InputButton } from './InputButton';
import { cn } from '../lib/utils';
import { getSkillPowerAtLevel } from '../utils/damageCalculator';
import type { Character, Skill } from '../types';

interface SkillPanelProps {
  selectedCharacter: Character | null;
  selectedSkill: Skill | null;
  skillLevel: number;
  skillPower: number | null;
  onSelectSkill: (skill: Skill) => void;
  onSkillLevelChange: (level: number) => void;
  onSkillPowerChange: (power: number) => void;
  className?: string;
}

export const SkillPanel: React.FC<SkillPanelProps> = ({
  selectedCharacter,
  selectedSkill,
  skillLevel,
  skillPower,
  onSelectSkill,
  onSkillLevelChange,
  onSkillPowerChange,
  className = '',
}) => {
  const { t } = useTranslation();

  // 現在の威力値を取得（スキル選択時の自動値または手動入力値）
  const getCurrentSkillPower = () => {
    return skillPower || 0;
  };

  // スキルタイプごとの色設定
  const getSkillTypeColor = (skillType: string) => {
    const colorMap: Record<string, string> = {
      'EX': 'bg-orange-500 text-white',
      'AS': 'bg-blue-500 text-white',
      'PS': 'bg-green-500 text-white',
    };
    return colorMap[skillType] || 'bg-gray-500 text-white';
  };


  if (!selectedCharacter) {
    return (
      <Card className={cn('h-full', className)}>
        <CardContent className="flex items-center justify-center h-48">
          <p className="text-muted-foreground">{t('character.noSelection')}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t('skill.title')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* スキル一覧 */}
          {selectedCharacter.skills.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              {t('skill.noSkills')}
            </div>
          ) : (
            <div className="space-y-2">
              <h3 className="font-medium text-sm text-muted-foreground mb-2">
                スキル選択
              </h3>
              <div className="grid gap-2">
                {selectedCharacter.skills.map((skill: Skill, index: number) => {
                  const isSelected = selectedSkill?.name === skill.name;
                  const skillPower = getSkillPowerAtLevel(skill, skillLevel);

                  return (
                    <Button
                      key={`${skill.name}-${index}`}
                      variant={isSelected ? 'default' : 'outline'}
                      className={cn(
                        'h-auto p-3 justify-start text-left',
                        isSelected && 'ring-2 ring-primary'
                      )}
                      onClick={() => onSelectSkill(skill)}
                    >
                      <div className="flex-1 space-y-2">
                        {/* スキル名とタイプ */}
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{skill.name}</span>
                          <Badge className={getSkillTypeColor(skill.skill_type)}>
                            {t(`skill.type.${skill.skill_type}`)}
                          </Badge>
                        </div>

                        {/* スキル詳細 */}
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>
                            {t('skill.power')}: {skillPower || '---'}
                          </span>
                          {skill.hit_count && (
                            <span>
                              {t('skill.hitCount')}: {skill.hit_count}
                            </span>
                          )}
                        </div>
                      </div>
                    </Button>
                  );
                })}
              </div>
            </div>
          )}

          {/* スキルレベル設定 */}
          {selectedSkill && (
            <div className="space-y-4 pt-4 border-t">
              <Rating
                value={skillLevel}
                onChange={onSkillLevelChange}
                max={15}
                label={t('skill.level')}
              />

              {/* スキル威力設定 */}
              <InputButton
                label={t('skill.power')}
                value={getCurrentSkillPower()}
                min={0}
                max={10000}
                step={0.1}
                onValueChange={onSkillPowerChange}
                unit=""
                className="space-y-2"
              />

              {/* 現在の設定表示 */}
              <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                <h4 className="font-medium text-sm">現在の設定</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('skill.level')}:</span>
                    <span className="font-medium">{skillLevel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('skill.power')}:</span>
                    <span className="font-medium">{getCurrentSkillPower()}</span>
                  </div>
                  {selectedSkill.hit_count && (
                    <div className="flex justify-between col-span-2">
                      <span className="text-muted-foreground">{t('skill.hitCount')}:</span>
                      <span className="font-medium">{selectedSkill.hit_count}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SkillPanel;