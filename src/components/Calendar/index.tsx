import React from 'react';
import { Feather } from '@expo/vector-icons'
import { Calendar as CustomCalendar, DateCallbackHandler, LocaleConfig } from 'react-native-calendars';
import { useTheme } from 'styled-components';
import { ptBR } from './localeConfig';
import { generationInterval } from './generateInterval';

LocaleConfig.locales['pt-br'] = ptBR;
LocaleConfig.defaultLocale = 'pt-br';

interface MarketDateProps {
  [date: string]: {
    color: string;
    textColor: string;
    disable?: boolean;
    disableTouchEvent?: boolean;
  },
}

interface DayProps {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
}

interface CalenderProps {
  marketDates: MarketDateProps;
  onDayPress: DateCallbackHandler;
}

function Calendar({ marketDates, onDayPress }: CalenderProps) {
  const theme = useTheme();
  return (
    <CustomCalendar
      renderArrow={(direction) =>
        <Feather
          size={24}
          color={theme.colors.text}
          name={direction === 'left' ? 'chevron-left' : 'chevron-right'}
        />
      }
      headerStyle={{
        backgroundColor: theme.colors.background_secondary,
        borderBottomWidth: 0.5,
        borderBottomColor: theme.colors.text_detail,
        padding: 10,
        margin: 10,
      }}
      theme={{
        textDayFontFamily: theme.fonts.primary_400,
        textDayHeaderFontFamily: theme.fonts.primary_500,
        textDayHeaderFontSize: 10,
        textMonthFontFamily: theme.fonts.secondary_600,
        monthTextColor: theme.colors.title,
        textMonthFontSize: 20,
        arrowStyle: {
          marginHorizontal: -15
        }
      }}
      firstDay={1}
      minDate={new Date()}
      markingType="period"
      markedDates={marketDates}
      onDayPress={onDayPress}
    />
  );
}

export { Calendar, MarketDateProps, DayProps, generationInterval }
