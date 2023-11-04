import * as React from "react";
import {
  FolderRegular,
  EditRegular,
  OpenRegular,
  DocumentRegular,
  PeopleRegular,
  DocumentPdfRegular,
  VideoRegular,
  Alert24Regular
} from "@fluentui/react-icons";
import {
  TableBody,
  Card,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableCellLayout,
  PresenceBadgeStatus,
  Avatar,
  Button,
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  useRestoreFocusTarget,
} from "@fluentui/react-components";

import  Diag  from "./diag";

interface ConfigurationItem {
  name: string;
  isHealthy: boolean;
  isRelated: boolean;
  healthDetails: HealthDetail[];
}

interface HealthDetail {
  id: string;
  icon: JSX.Element;
  desc: string;
  lastUpdated: string;
  action: JSX.Element;
  priority: string;
}


const items = [
  {
    icon: <Alert24Regular />,
    desc: "Does not exceed expected volume",
    lastUpdated: "7h ago",
    action: <Button>Mitigate</Button>
  },
  {
    icon: <DocumentRegular />,
    desc: "No exceptions detected",
    lastUpdated: "7h ago",
    action: <Button>View</Button>
  }
];

const columns = [
  { columnKey: "file", label: "Mobile Application"},
  { columnKey: "author", label: "" },
  { columnKey: "lastUpdate", label: "" },
];

export const Default = () => {

  //const [items, setItems] = React.useState<Item[]>([]);

  const [configurationItems, setConfigurationItems] = React.useState<ConfigurationItem[]>([]);
  const [incident_info, setIncidentInfo] = React.useState<ConfigurationItem[]>([]);
  const [open, setOpen] = React.useState(false);
  const restoreFocusTargetAttribute = useRestoreFocusTarget();
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const incidentId = params.get("incidentId");

  function Incident() {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const incidentId = params.get("incidentId");
  }

  React.useEffect(() => {

    const url = "http://localhost:3979/api/incident/" + incidentId;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        const processedConfigurationItems = data.relatedConfigurationItems.map((item: any) => {
          const healthDetails = item.healthDetails.map((detail: any) => {
            return {
              id: detail.id,
              icon: getIcon(detail.status),
              desc: detail.desc,
              lastUpdated: detail.ago,
              action: getButton(detail.canMitigate),
              priority: detail.status
            };
          });

          return {
            name: item.name,
            isHealthy: item.isHealthy,
            isRelated: item.isRelated,
            healthDetails,
          };
        });
        setConfigurationItems(processedConfigurationItems);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
}, []);
/*
  React.useEffect(() => {
    fetch("http://localhost:3979/api/incident")
      .then((response) => response.json())
      .then((data) => {
        const processedConfigurationItems = data.relatedConfigurationItems.map((item: any) => {
          const healthDetails = item.healthDetails.map((detail: any) => {
            return {
              id: detail.id,
              icon: getIcon(detail.status),
              desc: detail.desc,
              lastUpdated: detail.ago,
              actions: getButton(detail.canMitigate)
            };
          });

          return {
            name: item.name,
            isHealthy: item.isHealthy,
            isRelated: item.isRelated,
            healthDetails,
          };
        });
        setConfigurationItems(processedConfigurationItems);
      });
  }, []);
  */
  /*
  React.useEffect(() => {
    fetch("https://example.com/api/items")
      .then((response) => response.json())
      .then((data) => {
        const processedItems = data.map((item: any) => {
          // Process each item here
          const icon = getIcon(item.type);
          const desc = item.name;
          const lastUpdated = formatDate(item.updatedAt);
          const action = (
            <Button onClick={() => handleAction(item.id)}>Action</Button>
          );

          return {
            id: item.id,
            icon,
            desc,
            lastUpdated,
            action,
          };
        });

        setItems(processedItems);
      });
  }, []);
*/
  const getButton = (canMitigate: boolean ) => {
    // Return the appropriate icon based on the item type
    if (canMitigate === true) {
      return        <Button
      // restoreFocusTargetAttribute ensures that focus is restored to this button when the dialog closes
      {...restoreFocusTargetAttribute}
      onClick={() => {
        // it is the user responsibility to open the dialog
        setOpen(true);
      }}
    >
      Open Dialog
    </Button>
    } else {
      return <Button disabled>Modify</Button>;
    }
  };

  const getIcon = (type: string) => {
    // Return the appropriate icon based on the item type
    switch (type) {
      case "alert":
        return <FolderRegular />;
      case "document":
        return <DocumentRegular />;
      case "info":
        return <DocumentPdfRegular />;
      case "video":
        return <VideoRegular />;
      default:
        return <Alert24Regular />;
    }
  };

  const formatDate = (date: string) => {
    // Format the date string to a more readable format
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    return formattedDate;
  };

  const handleAction = (itemId: number) => {
    // Handle the action for the selected item
    console.log(`Action clicked for item ${itemId}`);
  };
  
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
    <div style={{ width: "100%", height: "50px" }}>
      {incidentId}
    </div>
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ flex: 1 }}>
      {configurationItems.map((config_item) => (
        // Only render the card if config.unHealthy is true
        config_item.isHealthy === false && (
          <Card key={config_item.name}>
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
              {config_item.name}
            </div>
            {config_item.healthDetails.map((item) => (
                          <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                            borderBottom: item.priority === "alert" ? "2px solid red" : "none"
                          }}>
                            <div style={{ display: "flex", alignItems: "center", textAlign: "left" }}>
                            <div style={{ minWidth: "25px" }}>{item.icon}</div>
                              <div >{item.desc} {item.lastUpdated}</div>
                            </div>
                            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                              <div>{item.action}</div>
                            </div>
                        </div>

            ))} 
          </Card>
        )))}
      
      </div>
      <div style={{ width:'10px' }}>
      </div>
      <div style={{ flex: 1 }}>
      {configurationItems.map((config_item) => (
        // Only render the card if config.unHealthy is true
        config_item.isHealthy && (
          <Card key={config_item.name}>
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
              {config_item.name}
            </div>
            {config_item.healthDetails.map((item) => (
                          <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                            borderBottom: item.priority === "alert" ? "2px solid red" : "none"
                          }}>
                            <div style={{ display: "flex", alignItems: "center", textAlign: "left" }}>
                              <div style={{ minWidth: "25px" }}>{item.icon}</div>
                              <div >{item.desc} {item.lastUpdated}</div>
                            </div>
                            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                              <div>{item.action}</div>
                            </div>
                          </div>

            ))} 
          </Card>
        )))}
      </div>
    </div>
    <Dialog style={{minWidth: '1000px'}} open={open}
        onOpenChange={(event: any, data: { open: boolean | ((prevState: boolean) => boolean); }) => {
          // it is the users responsibility to react accordingly to the open state change
          setOpen(data.open);
        }}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Dialog title</DialogTitle>
          <DialogContent>
            <Diag id="1" />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            exercitationem cumque repellendus eaque est dolor eius expedita
            nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates
            in natus iure cumque eaque?
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="primary">Close</Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  </div>
    
  );
};
