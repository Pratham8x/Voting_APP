import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import Svg, {
  Line,
  Polyline,
  Circle,
  Text as SvgText,
  
} from 'react-native-svg'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

// ─── Chart Config ────────────────────────────────────────────────────────────
const CARD_PADDING   = 16   // horizontal padding of the card inside the screen
const SVG_WIDTH      = SCREEN_WIDTH - CARD_PADDING * 2 - 32  // 32 = inner card padding * 2
const SVG_HEIGHT     = 260
const AXIS_LEFT      = 42  // space for Y-axis labels
const AXIS_BOTTOM    = 30   // space for X-axis labels
const PLOT_WIDTH     = SVG_WIDTH - AXIS_LEFT - 8
const PLOT_HEIGHT    = SVG_HEIGHT - AXIS_BOTTOM - 10

// Y-axis: $0M → $8M in steps of $2M  (5 ticks: 0, 2, 4, 6, 8)
const Y_MIN   = 0
const Y_MAX   = 8
const Y_STEPS = [0, 2, 4, 6, 8]

// X-axis: Jan → Jun (6 months)
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

// Helper: convert data value → SVG y-coordinate
const toY = (val: number) =>
  10 + PLOT_HEIGHT - ((val - Y_MIN) / (Y_MAX - Y_MIN)) * PLOT_HEIGHT

// Helper: convert month index → SVG x-coordinate
const toX = (i: number) =>
  AXIS_LEFT + (i / (MONTHS.length - 1)) * PLOT_WIDTH

// ─── Data points (values in $M) ───────────────────────────────────────────────
// Revenue line  — sits between $4M–$6M and rises toward $7M
const revenueData = [3.2, 3.8, 3.5, 5.0, 4.6, 6.2]

// Expenses line — sits between $2M–$4M, always below revenue
const expensesData = [2.2, 2.8, 2.5, 3.4, 3.1, 4.0]

// Build polyline point strings
const revenuePoints = revenueData
  .map((v, i) => `${toX(i)},${toY(v)}`)
  .join(' ')

const expensesPoints = expensesData
  .map((v, i) => `${toX(i)},${toY(v)}`)
  .join(' ')

// ─── Component ────────────────────────────────────────────────────────────────
const RevVSExp = () => {
  return (
    <View style={styles.card}>

      {/* Card header */}
      <Text style={styles.cardTitle}>Revenue vs Expenses</Text>

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#4f46e5' }]} />
          <Text style={styles.legendLabel}>Revenue</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#f97316' }]} />
          <Text style={styles.legendLabel}>Expenses</Text>
        </View>
      </View>

      {/* SVG Chart */}
      <Svg width={SVG_WIDTH} height={SVG_HEIGHT}>

        {/* ── Grid lines (horizontal) ── */}
        {Y_STEPS.map((val) => (
          <Line
            key={`hgrid-${val}`}
            x1={AXIS_LEFT}
            y1={toY(val)}
            x2={AXIS_LEFT + PLOT_WIDTH}
            y2={toY(val)}
            stroke="#e5e7eb"
            strokeWidth={1}
            strokeDasharray="4 3"
          />
        ))}

        {/* ── Grid lines (vertical) ── */}
        {MONTHS.map((_, i) => (
          <Line
            key={`vgrid-${i}`}
            x1={toX(i)}
            y1={10}
            x2={toX(i)}
            y2={10 + PLOT_HEIGHT}
            stroke="#e5e7eb"
            strokeWidth={1}
            strokeDasharray="4 3"
          />
        ))}

        {/* ── Y-axis line ── */}
        <Line
          x1={AXIS_LEFT}
          y1={10}
          x2={AXIS_LEFT}
          y2={10 + PLOT_HEIGHT}
          stroke="#9ca3af"
          strokeWidth={1}
        />

        {/* ── X-axis line ── */}
        <Line
          x1={AXIS_LEFT}
          y1={10 + PLOT_HEIGHT}
          x2={AXIS_LEFT + PLOT_WIDTH}
          y2={10 + PLOT_HEIGHT}
          stroke="#9ca3af"
          strokeWidth={1}
        />

{/* ── Y-axis labels ── */}
{Y_STEPS.map((val) => (
  <SvgText
    key={`ylabel-${val}`}
    x={AXIS_LEFT - 36}
    y={toY(val) + 4}
    textAnchor="start"
    fontSize={11}
    fill="#777"
  >
    ${val}.0M 
  </SvgText>
))}

        {/* ── X-axis labels ── */}
        {MONTHS.map((month, i) => (
          <SvgText
            key={`xlabel-${month}`}
            x={toX(i)}
            y={10 + PLOT_HEIGHT + 18}
            textAnchor="middle"
            fontSize={10}
            fill="#6b7280"
          >
            {month}
          </SvgText>
        ))}

        {/* ── Revenue line ── */}
        <Polyline
          points={revenuePoints}
          fill="none"
          stroke="#4f46e5"
          strokeWidth={2.5}
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* ── Expenses line ── */}
        <Polyline
          points={expensesPoints}
          fill="none"
          stroke="#f97316"
          strokeWidth={2.5}
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* ── Revenue dots ── */}
        {revenueData.map((val, i) => (
          <Circle
            key={`rdot-${i}`}
            cx={toX(i)}
            cy={toY(val)}
            r={4}
            fill="#4f46e5"
            stroke="#ffffff"
            strokeWidth={1.5}
          />
        ))}

        {/* ── Expenses dots ── */}
        {expensesData.map((val, i) => (
          <Circle
            key={`edot-${i}`}
            cx={toX(i)}
            cy={toY(val)}
            r={4}
            fill="#f97316"
            stroke="#ffffff"
            strokeWidth={1.5}
          />
        ))}

      </Svg>
    </View>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginTop: 16,
    marginHorizontal: 0,
    paddingVertical: 18,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 5,
  },
  cardTitle: {
    color: '#1e293b',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
  },
  legend: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendLabel: {
    color: '#64748b',
    fontSize: 12,
    fontWeight: '500',
  },
})

export default RevVSExp