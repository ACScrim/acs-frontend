import type { App } from "vue";

// Composants atomiques - Attention aux noms des fichiers
import Button from "@/components/ui/atoms/Button.vue";
import Input from "@/components/ui/atoms/Input.vue";
import Badge from "@/components/ui/atoms/Badge.vue";
import Title from "@/components/ui/atoms/Title.vue";
import Toggle from "@/components/ui/atoms/Toggle.vue"; // Ajout du composant Toggle
import Dropdown from "@/components/ui/atoms/Dropdown.vue";
// Composants moléculaires
import Card from "@/components/ui/molecules/Card.vue";
import Alert from "@/components/ui/molecules/Alert.vue";
import Modal from "@/components/ui/molecules/Modal.vue";
import Loader from "@/components/ui/molecules/Loader.vue";
import Header from "@/components/ui/molecules/Header.vue";
import MemberCard from "@/components/ui/molecules/MemberCard.vue";
// Composants organismes
import Pagination from "@/components/ui/organisms/Pagination.vue";
import Terminal from "@/components/ui/organisms/Terminal.vue";

//Layout
import Container from "@/components/ui/layout/Container.vue";

// Liste des composants à enregistrer avec les bons noms pour Vue
const components = {
  // Atoms
  Button: Button,
  SpaceInput: Input,
  SpaceBadge: Badge,
  Title: Title,
  Loader: Loader,
  SpaceToggle: Toggle,
  SpaceDropdown: Dropdown, // Ajout du composant Toggle

  // Molecules
  Card: Card,
  SpaceAlert: Alert,
  SpaceModal: Modal,
  Header: Header,
  SpaceMemberCard: MemberCard,

  // Organisms
  SpacePagination: Pagination,
  Terminal: Terminal,

  // Layout
  SpaceContainer: Container,
};

export default {
  install(app: App) {
    // Enregistrer tous les composants
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component);
    });

    // Fournir des méthodes ou données globales si nécessaire
    app.provide("spaceTheme", {
      name: "Space Theme",
      version: "1.0.0",
    });
  },
};
