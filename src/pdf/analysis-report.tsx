"use client";

import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// ✅ Menggunakan Roboto dengan weight yang lebih tebal
Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf",
      fontWeight: "semibold",
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
      fontWeight: "bold",
    },
  ],
});

export type AnalysisSectionDetail = {
  title: string;
  score?: number;
  feedback?: string;
};

export type AnalysisPdfPayload = {
  jobTitle: string;
  company: string;
  score?: number;
  date?: string;
  cvFileName?: string;
  summary?: string;
  jobDescription?: string;
  sections?: AnalysisSectionDetail[];
  strengths?: string[];
  weaknesses?: string[];
  suggestions?: string[];
  keywords?: {
    found?: string[];
    missing?: string[];
  };
};

const styles = StyleSheet.create({
  page: {
    fontFamily: "Roboto",
    backgroundColor: "#050C1F",
    padding: 24,
    color: "#F8FAFC",
    fontSize: 10,
  },
  heroCard: {
    borderRadius: 16,
    padding: 20,
    backgroundColor: "#101831",
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
  heroLeft: {
    flexBasis: "62%",
  },
  heroRight: {
    flexBasis: "34%",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: -0.5,
  },
  badge: {
    marginTop: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    fontSize: 9,
    fontWeight: "semibold",
    alignSelf: "flex-start",
  },
  infoGrid: {
    marginTop: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  infoCard: {
    width: "48%",
    backgroundColor: "#0D1427",
    padding: 12,
    borderRadius: 10,
  },
  infoLabel: {
    fontSize: 9,
    color: "#8BA1D2",
    fontWeight: "semibold",
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 11,
    fontWeight: "semibold",
    color: "#E2E8F0",
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#F8FAFC",
  },
  sectionCard: {
    backgroundColor: "#111B38",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  sectionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  sectionItem: {
    width: "48%",
    backgroundColor: "#0D1427",
    borderRadius: 10,
    padding: 12,
  },
  columnCard: {
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  keywordBadge: {
    borderRadius: 12,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 9,
    margin: 3,
    fontWeight: "semibold",
  },
});

const formatDate = (value?: string) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const getScoreBadge = (score?: number) => {
  if (score === undefined)
    return { label: "Laporan Analisis", color: "#0EA5E9" };
  if (score >= 81) return { label: "Outstanding Match", color: "#22C55E" };
  if (score >= 61) return { label: "Great Potential", color: "#FACC15" };
  return { label: "Needs Improvement", color: "#F87171" };
};

const getScoreColor = (score?: number) => {
  if (score === undefined) return "#38BDF8";
  if (score >= 81) return "#22C55E";
  if (score >= 61) return "#FACC15";
  return "#F87171";
};

const SectionCard = ({ title, score, feedback }: AnalysisSectionDetail) => (
  <View style={styles.sectionItem}>
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 6,
      }}
    >
      <Text style={{ fontWeight: "bold", fontSize: 11, color: "#F8FAFC" }}>
        {title}
      </Text>
      {score !== undefined && (
        <Text
          style={{
            color: getScoreColor(score),
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          {score}
        </Text>
      )}
    </View>
    {feedback && (
      <Text style={{ color: "#94A3B8", fontSize: 9, lineHeight: 1.4 }}>
        {feedback}
      </Text>
    )}
    {score !== undefined && (
      <View
        style={{
          marginTop: 8,
          height: 5,
          borderRadius: 10,
          backgroundColor: "#1f2a46",
          overflow: "hidden",
        }}
      >
        <View
          style={{
            height: 5,
            borderRadius: 10,
            width: `${Math.min(100, Math.max(0, score))}%`,
            backgroundColor: getScoreColor(score),
          }}
        />
      </View>
    )}
  </View>
);

const ListColumn = ({
  title,
  items,
  color,
  bgColor,
}: {
  title: string;
  items?: string[];
  color: string;
  bgColor: string;
}) => {
  if (!items?.length) return null;
  return (
    <View
      style={{
        ...styles.columnCard,
        backgroundColor: bgColor,
        width: "100%",
      }}
    >
      <Text
        style={{ fontSize: 13, fontWeight: "bold", color, marginBottom: 10 }}
      >
        {title}
      </Text>
      {items.map((item, idx) => (
        <View
          key={`${title}-${idx}`}
          style={{
            flexDirection: "row",
            marginBottom: 8,
            alignItems: "flex-start",
          }}
        >
          <View
            style={{
              width: 7,
              height: 7,
              borderRadius: 10,
              backgroundColor: color,
              marginTop: 5,
              marginRight: 8,
              flexShrink: 0,
            }}
          />
          <Text
            style={{ fontSize: 10, color: "#E2E8F0", lineHeight: 1.5, flex: 1 }}
          >
            {item}
          </Text>
        </View>
      ))}
    </View>
  );
};

const SuggestionsCard = ({ items }: { items?: string[] }) => {
  if (!items?.length) return null;
  return (
    <View
      style={{
        ...styles.sectionCard,
        backgroundColor: "#1B1405",
        marginBottom: 12,
      }}
    >
      <Text
        style={{
          fontSize: 13,
          fontWeight: "bold",
          color: "#FACC15",
          marginBottom: 10,
        }}
      >
        Saran Perbaikan Konkret
      </Text>
      {items.map((item, idx) => (
        <View
          key={`suggestion-${idx}`}
          style={{
            flexDirection: "row",
            marginBottom: 8,
            alignItems: "flex-start",
            gap: 8,
          }}
        >
          <View
            style={{
              backgroundColor: "#FACC15",
              paddingHorizontal: 8,
              paddingVertical: 3,
              borderRadius: 12,
              minWidth: 20,
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <Text style={{ fontSize: 9, fontWeight: "bold", color: "#0F172A" }}>
              {idx + 1}
            </Text>
          </View>
          <Text
            style={{ fontSize: 10, color: "#E2E8F0", lineHeight: 1.5, flex: 1 }}
          >
            {item}
          </Text>
        </View>
      ))}
    </View>
  );
};

const KeywordsSection = ({
  found,
  missing,
}: {
  found?: string[];
  missing?: string[];
}) => {
  if (!found?.length && !missing?.length) return null;
  return (
    <View style={{ ...styles.sectionCard }}>
      <Text style={styles.sectionTitle}>Analisis Keywords</Text>

      {found?.length ? (
        <View style={{ marginBottom: missing?.length ? 10 : 0 }}>
          <Text
            style={{
              fontSize: 10,
              color: "#34D399",
              fontWeight: "semibold",
              marginBottom: 6,
            }}
          >
            Keywords Ditemukan
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {found.map((keyword) => (
              <View
                key={`found-${keyword}`}
                style={{
                  ...styles.keywordBadge,
                  backgroundColor: "#064E3B",
                }}
              >
                <Text style={{ fontSize: 9, color: "#34D399" }}>{keyword}</Text>
              </View>
            ))}
          </View>
        </View>
      ) : null}

      {missing?.length ? (
        <View>
          <Text
            style={{
              fontSize: 10,
              color: "#F87171",
              fontWeight: "semibold",
              marginBottom: 6,
            }}
          >
            Keywords yang Hilang
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {missing.map((keyword) => (
              <View
                key={`missing-${keyword}`}
                style={{
                  ...styles.keywordBadge,
                  backgroundColor: "#581C1C",
                }}
              >
                <Text style={{ fontSize: 9, color: "#F87171" }}>{keyword}</Text>
              </View>
            ))}
          </View>
        </View>
      ) : null}
    </View>
  );
};

const AnalysisReport = ({ data }: { data: AnalysisPdfPayload }) => {
  const badge = getScoreBadge(data.score);

  // Split sections into two columns for better layout
  const halfLength = Math.ceil((data.sections?.length || 0) / 2);
  const firstColumnSections = data.sections?.slice(0, halfLength) || [];
  const secondColumnSections = data.sections?.slice(halfLength) || [];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Hero Section */}
        <View style={styles.heroCard}>
          <View style={styles.heroLeft}>
            <Text style={styles.heading}>
              Hasil Analisis CV :: Aldy Akbarrizky
            </Text>
            <View
              style={{
                ...styles.badge,
                backgroundColor: badge.color,
              }}
            >
              <Text
                style={{ fontSize: 9, color: "#0F172A", fontWeight: "bold" }}
              >
                {badge.label}
              </Text>
            </View>

            <View style={styles.infoGrid}>
              {[
                { label: "Posisi", value: data.jobTitle },
                { label: "Perusahaan", value: data.company },
                { label: "Tanggal Analisis", value: formatDate(data.date) },
                { label: "File CV", value: data.cvFileName },
              ].map((item, idx) => (
                <View key={`info-${item.label}`} style={styles.infoCard}>
                  <Text style={styles.infoLabel}>{item.label}</Text>
                  <Text style={styles.infoValue}>{item.value}</Text>
                </View>
              ))}
            </View>

            <View style={[styles.infoCard, { marginTop: 10, width: "100%" }]}>
              <Text style={styles.infoLabel}>Ringkasan Pekerjaan</Text>
              <Text style={{ color: "#CBD5E1", fontSize: 10, lineHeight: 1.5 }}>
                {data.jobDescription ??
                  "Kami mencari profesional dengan pengalaman relevan dan minat tinggi pada teknologi modern."}
              </Text>
            </View>
          </View>

          <View style={styles.heroRight}>
            <View
              style={{
                width: 140,
                height: 140,
                borderRadius: 70,
                backgroundColor: "#090F22",
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 3,
                borderColor: getScoreColor(data.score),
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  color: "#8BA1D2",
                  marginBottom: 4,
                  fontWeight: "semibold",
                  letterSpacing: 1,
                }}
              >
                SKOR CV
              </Text>
              <Text
                style={{
                  fontSize: 38,
                  fontWeight: "bold",
                  color: getScoreColor(data.score),
                }}
              >
                {data.score ?? "-"}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: "#64748B",
                  fontWeight: "semibold",
                }}
              >
                / 100
              </Text>
            </View>
          </View>
        </View>

        {/* Detailed Analysis Section */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Analisis Detail per Bagian</Text>
          <View style={styles.sectionGrid}>
            {data.sections?.map((section) => (
              <SectionCard key={section.title} {...section} />
            ))}
          </View>
        </View>
      </Page>

      {/* Page 2 */}
      <Page size="A4" style={styles.page}>
        {/* Strengths and Weaknesses */}
        <ListColumn
          title="✅ Kelebihan CV Anda"
          items={data.strengths}
          color="#22C55E"
          bgColor="#0C2818"
        />

        <ListColumn
          title="⚠️ Area yang Perlu Diperbaiki"
          items={data.weaknesses}
          color="#F87171"
          bgColor="#2D1313"
        />

        {/* Suggestions */}
        <SuggestionsCard items={data.suggestions} />

        {/* Keywords */}
        <KeywordsSection {...data.keywords} />
      </Page>
    </Document>
  );
};

export default AnalysisReport;
