import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#fff",
  },
  tabIndicator: {
    backgroundColor: "#007AFF",
  },
  tabContent: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 8
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    flex: 1,
  },
  cardHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardDescription: {
    color: "#666",
    marginTop: 4,
  },
  cardContent: {
    padding: 16,
    flex: 1,
  },
  logItem: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 8,
    marginBottom: 16,
  },
  logValue: {
    fontSize: 18,
    fontWeight: "500",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  icon: {
    marginRight: 4,
  },
  dateText: {
    fontSize: 12,
    color: "#666",
  },
  notesText: {
    fontSize: 14,
    marginTop: 4,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 16
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8
  },
  outlineButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderWidth: 1,
    borderColor: "#007AFF",
    borderRadius: 8,
    marginTop: 16,
  },
  outlineButtonText: {
    color: "#007AFF",
    fontWeight: "500",
    marginLeft: 8,
  },
  inputContainer: {
    marginBottom: 16
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
});

