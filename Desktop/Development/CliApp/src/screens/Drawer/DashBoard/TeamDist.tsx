import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import Svg, { G, Path, Text as SvgText} from 'react-native-svg'
import Ionicons from '@react-native-vector-icons/ionicons'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

// ── Pie chart config ──────────────────────────────────────────────────────────
const SIZE      = Math.min(SCREEN_WIDTH - 80, 240)  // diameter
const CX        = SIZE / 2
const CY        = SIZE / 2
const R_OUTER   = SIZE / 2 - 8
const R_INNER   = R_OUTER * 0.52   // donut hole

// ── Data ─────────────────────────────────────────────────────────────────────
const segments = [
  { label: 'Engineering',  value: 35, color: '#4f46e5' },
  { label: 'Operations',   value: 28, color: '#22c55e' },
  { label: 'Management',   value: 18, color: '#f97316' },
  { label: 'Quality',      value: 12, color: '#a855f7' },
  { label: 'Safety',       value:  7, color: '#06b6d4' },
]

// ── Helpers ───────────────────────────────────────────────────────────────────
const toRad = (deg: number) => (deg * Math.PI) / 180

// Convert polar → cartesian
const polar = (cx: number, cy: number, r: number, angleDeg: number) => ({
  x: cx + r * Math.cos(toRad(angleDeg)),
  y: cy + r * Math.sin(toRad(angleDeg)),
})

// Build SVG arc path for a donut slice
const slicePath = (
  cx: number, cy: number,
  rOuter: number, rInner: number,
  startDeg: number, endDeg: number
) => {
  const o1 = polar(cx, cy, rOuter, startDeg)
  const o2 = polar(cx, cy, rOuter, endDeg)
  const i1 = polar(cx, cy, rInner, endDeg)
  const i2 = polar(cx, cy, rInner, startDeg)
  const large = endDeg - startDeg > 180 ? 1 : 0

  return [
    `M ${o1.x} ${o1.y}`,
    `A ${rOuter} ${rOuter} 0 ${large} 1 ${o2.x} ${o2.y}`,
    `L ${i1.x} ${i1.y}`,
    `A ${rInner} ${rInner} 0 ${large} 0 ${i2.x} ${i2.y}`,
    'Z',
  ].join(' ')
}

// ── Build slices with start/end angles ───────────────────────────────────────
const total = segments.reduce((s, d) => s + d.value, 0)
let cursor = -90  // start from top

const slices = segments.map((seg) => {
  const startDeg = cursor
  const sweep    = (seg.value / total) * 360
  const endDeg   = cursor + sweep
  const midDeg   = startDeg + sweep / 2
  cursor         = endDeg

  return {
    ...seg,
    startDeg,
    endDeg,
    midDeg,
    path: slicePath(CX, CY, R_OUTER, R_INNER, startDeg, endDeg),
  }
})

// ── Component ─────────────────────────────────────────────────────────────────
const TeamDist = () => {
  return (
    <View style={styles.card}>

      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="people-outline" size={20} color="#4f46e5" />
        <Text style={styles.cardTitle}>Team Distribution by Department</Text>
      </View>

      {/* Pie chart centred */}
      <View style={styles.chartWrapper}>
        <Svg width={SIZE} height={SIZE}>
          <G>
            {slices.map((slice, i) => (
              <Path
                key={i}
                d={slice.path}
                fill={slice.color}
                stroke="#ffffff"
                strokeWidth={2}
              />
            ))}
          </G>

          {/* Centre label */}
          <SvgText
            x={CX}
            y={CY - 6}
            textAnchor="middle"
            fontSize={13}
            fill="#64748b"
            fontWeight="500"
          >
            Total
          </SvgText>
          <SvgText
            x={CX}
            y={CY + 12}
            textAnchor="middle"
            fontSize={18}
            fill="#1e293b"
            fontWeight="700"
          >
            303
          </SvgText>
        </Svg>
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        {slices.map((slice, i) => (
          <View key={i} style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: slice.color }]} />
            <Text style={styles.legendText}>
              {slice.label}
              <Text style={styles.legendPercent}>  {slice.value}%</Text>
            </Text>
          </View>
        ))}
      </View>

    </View>
  )
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginTop: 16,
    paddingVertical: 18,
    paddingHorizontal: 16,
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
    marginBottom: 20,
  },
  cardTitle: {
    color: '#1e293b',
    fontSize: 16,
    fontWeight: '700',
    flexShrink: 1,
  },
  chartWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    minWidth: '40%',
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    color: '#475569',
    fontSize: 13,
    fontWeight: '500',
  },
  legendPercent: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '400',
  },
})

export default TeamDist