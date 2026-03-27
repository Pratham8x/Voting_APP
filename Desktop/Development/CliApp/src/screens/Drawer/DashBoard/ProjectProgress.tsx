import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import Svg, { Rect, Text as SvgText, G, Line } from 'react-native-svg'
import Ionicons from '@react-native-vector-icons/ionicons'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

// ── Chart dimensions ──────────────────────────────────────────────────────────
const CARD_H_PADDING = 16
const SVG_WIDTH      = SCREEN_WIDTH - CARD_H_PADDING * 2 - 32  // 32 = outer margin * 2
const LABEL_WIDTH    = 120
const BAR_AREA_WIDTH = SVG_WIDTH - LABEL_WIDTH - 40  // 40 = space for % text on right
const ROW_HEIGHT     = 44
const BAR_HEIGHT     = 18
const BAR_RADIUS     = 6

const projects = [
  { name: 'Metro Rail',            progress: 75 },
  { name: 'Highway Bridge',        progress: 45 },
  { name: 'Commercial Complex',    progress: 60 },
  { name: 'Residential Township',  progress: 25 },
  { name: 'Water Treatment',       progress: 90 },
]

const SVG_HEIGHT = projects.length * ROW_HEIGHT + 10

const ProjectProgress = () => {
  return (
    <View style={styles.card}>

      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="bar-chart-outline" size={20} color="#4f46e5" />
        <Text style={styles.cardTitle}>Project Progress</Text>
      </View>

      {/* SVG Bar Chart */}
      <Svg width={SVG_WIDTH} height={SVG_HEIGHT}>
        {projects.map((item, i) => {
          const y          = i * ROW_HEIGHT
          const barY       = y + (ROW_HEIGHT - BAR_HEIGHT) / 2
          const filledW    = (item.progress / 100) * BAR_AREA_WIDTH

          // Color based on progress
          const barColor =
            item.progress >= 70
              ? '#4f46e5'   // indigo  — good
              : item.progress >= 40
              ? '#f97316'   // orange  — mid
              : '#ef4444'   // red     — low

          return (
            <G key={i}>

              {/* Project name label */}
              <SvgText
                x={0}
                y={y + ROW_HEIGHT / 2 + 4}
                fontSize={11}
                fill="#334155"
                fontWeight="500"
              >
                {item.name}
              </SvgText>

              {/* Track (background bar) */}
              <Rect
                x={LABEL_WIDTH}
                y={barY}
                width={BAR_AREA_WIDTH}
                height={BAR_HEIGHT}
                rx={BAR_RADIUS}
                ry={BAR_RADIUS}
                fill="#e2e8f0"
              />

              {/* Filled bar */}
              <Rect
                x={LABEL_WIDTH}
                y={barY}
                width={filledW}
                height={BAR_HEIGHT}
                rx={BAR_RADIUS}
                ry={BAR_RADIUS}
                fill={barColor}
              />

              {/* Percentage text */}
              <SvgText
                x={LABEL_WIDTH + BAR_AREA_WIDTH + 8}
                y={y + ROW_HEIGHT / 2 + 4}
                fontSize={11}
                fill="#64748b"
                fontWeight="600"
              >
                {item.progress}%
              </SvgText>

              {/* Divider line between rows */}
              {i < projects.length - 1 && (
                <Line
                  x1={0}
                  y1={y + ROW_HEIGHT}
                  x2={SVG_WIDTH}
                  y2={y + ROW_HEIGHT}
                  stroke="#f1f5f9"
                  strokeWidth={1}
                />
              )}

            </G>
          )
        })}
      </Svg>

    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginTop: 16,
    paddingVertical: 18,
    paddingHorizontal: CARD_H_PADDING,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  cardTitle: {
    color: '#1e293b',
    fontSize: 16,
    fontWeight: '700',
  },
})

export default ProjectProgress