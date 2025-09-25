import { useMemo } from "react";
import { scaleLinear } from "d3-scale";
import complaintsData from "@/data/complaints.json";

export function HeatmapChart() {
  const heatmapData = useMemo(() => {
    // Generate data for the last 52 weeks (7 days * 52 weeks = 364 days)
    const weeks = 52;
    const daysPerWeek = 7;
    const data = [];
    
    // Create a date 364 days ago
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 364);
    
    for (let week = 0; week < weeks; week++) {
      for (let day = 0; day < daysPerWeek; day++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + (week * 7) + day);
        
        // Generate random activity level (0-5) based on day of week
        // Weekdays have more activity than weekends
        const isWeekend = day === 0 || day === 6;
        const baseActivity = isWeekend ? Math.random() * 2 : Math.random() * 4 + 1;
        
        // Add some seasonal variation
        const monthFactor = Math.sin((currentDate.getMonth() / 12) * 2 * Math.PI) * 0.5 + 1;
        const activity = Math.round(baseActivity * monthFactor);
        
        data.push({
          date: currentDate.toISOString().split('T')[0],
          activity: Math.max(0, Math.min(5, activity)),
          week,
          day
        });
      }
    }
    
    return data;
  }, []);

  // Create color scale
  const colorScale = scaleLinear<string>()
    .domain([0, 1, 2, 3, 4, 5])
    .range([
      'hsl(240 3.7% 15.9%)',      // Very dark (no activity)
      'hsl(262 80% 60% / 0.2)',   // Very light purple
      'hsl(262 80% 60% / 0.4)',   // Light purple
      'hsl(262 80% 60% / 0.6)',   // Medium purple
      'hsl(262 80% 60% / 0.8)',   // Strong purple
      'hsl(262 80% 60%)'          // Full purple (highest activity)
    ]);

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  // Get month labels for display
  const monthLabels = useMemo(() => {
    const labels = [];
    const today = new Date();
    
    for (let i = 0; i < 12; i++) {
      const date = new Date(today);
      date.setMonth(today.getMonth() - 11 + i);
      const weekIndex = Math.floor((i / 12) * 52);
      
      labels.push({
        name: monthNames[date.getMonth()],
        week: weekIndex
      });
    }
    
    return labels.filter((label, index, arr) => 
      index === 0 || label.name !== arr[index - 1]?.name
    );
  }, []);

  return (
    <div className="w-full">
      {/* Month labels */}
      <div className="flex justify-between text-xs text-muted-foreground mb-2 px-4">
        {monthLabels.map((month, index) => (
          <span key={index}>{month.name}</span>
        ))}
      </div>
      
      {/* Day labels and grid */}
      <div className="flex gap-1">
        {/* Day of week labels */}
        <div className="flex flex-col justify-around text-xs text-muted-foreground pr-2">
          {dayNames.map((day, index) => (
            <span key={index} className="h-3 flex items-center">
              {day}
            </span>
          ))}
        </div>
        
        {/* Heatmap grid */}
        <div className="flex gap-1 overflow-x-auto">
          {Array.from({ length: 52 }, (_, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {Array.from({ length: 7 }, (_, dayIndex) => {
                const dataPoint = heatmapData.find(d => d.week === weekIndex && d.day === dayIndex);
                const activity = dataPoint?.activity || 0;
                
                return (
                  <div
                    key={dayIndex}
                    className="w-3 h-3 rounded-sm border border-dashboard-border/20 cursor-pointer transition-all hover:scale-110 hover:border-primary/50"
                    style={{
                      backgroundColor: colorScale(activity)
                    }}
                    title={`${dataPoint?.date}: ${activity} activities`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
        <span>Less</span>
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4, 5].map((level) => (
            <div
              key={level}
              className="w-3 h-3 rounded-sm border border-dashboard-border/20"
              style={{
                backgroundColor: colorScale(level)
              }}
            />
          ))}
        </div>
        <span>More</span>
      </div>
      
      {/* Stats */}
      <div className="mt-4 text-sm text-muted-foreground">
        <p>Total activity this year: <span className="text-foreground font-medium">{heatmapData.reduce((sum, d) => sum + d.activity, 0)}</span></p>
        <p>Most active day: <span className="text-foreground font-medium">{Math.max(...heatmapData.map(d => d.activity))} activities</span></p>
      </div>
    </div>
  );
}