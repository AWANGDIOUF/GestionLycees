package mefpai.gouv.sn.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import mefpai.gouv.sn.domain.OrganeGestion;
import mefpai.gouv.sn.repository.OrganeGestionRepository;
import mefpai.gouv.sn.security.SecurityUtils;
import mefpai.gouv.sn.service.OrganeGestionService;
import mefpai.gouv.sn.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
// import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link mefpai.gouv.sn.domain.OrganeGestion}.
 */
@RestController
@RequestMapping("/api")
public class OrganeGestionResource {

    private final Logger log = LoggerFactory.getLogger(OrganeGestionResource.class);

    private static final String ENTITY_NAME = "organeGestion";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OrganeGestionService organeGestionService;

    private final OrganeGestionRepository organeGestionRepository;

    public OrganeGestionResource(OrganeGestionService organeGestionService, OrganeGestionRepository organeGestionRepository) {
        this.organeGestionService = organeGestionService;
        this.organeGestionRepository = organeGestionRepository;
    }

    /**
     * {@code POST  /organe-gestions} : Create a new organeGestion.
     *
     * @param organeGestion the organeGestion to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new organeGestion, or with status {@code 400 (Bad Request)} if the organeGestion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/organe-gestions")
    public ResponseEntity<OrganeGestion> createOrganeGestion(@Valid @RequestBody OrganeGestion organeGestion) throws URISyntaxException {
        log.debug("REST request to save OrganeGestion : {}", organeGestion);
        if (organeGestion.getId() != null) {
            throw new BadRequestAlertException("A new organeGestion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OrganeGestion result = organeGestionService.save(organeGestion);
        return ResponseEntity
            .created(new URI("/api/organe-gestions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /organe-gestions/:id} : Updates an existing organeGestion.
     *
     * @param id the id of the organeGestion to save.
     * @param organeGestion the organeGestion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated organeGestion,
     * or with status {@code 400 (Bad Request)} if the organeGestion is not valid,
     * or with status {@code 500 (Internal Server Error)} if the organeGestion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/organe-gestions/{id}")
    public ResponseEntity<OrganeGestion> updateOrganeGestion(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody OrganeGestion organeGestion
    ) throws URISyntaxException {
        log.debug("REST request to update OrganeGestion : {}, {}", id, organeGestion);
        if (organeGestion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, organeGestion.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!organeGestionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        OrganeGestion result = organeGestionService.save(organeGestion);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, organeGestion.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /organe-gestions/:id} : Partial updates given fields of an existing organeGestion, field will ignore if it is null
     *
     * @param id the id of the organeGestion to save.
     * @param organeGestion the organeGestion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated organeGestion,
     * or with status {@code 400 (Bad Request)} if the organeGestion is not valid,
     * or with status {@code 404 (Not Found)} if the organeGestion is not found,
     * or with status {@code 500 (Internal Server Error)} if the organeGestion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/organe-gestions/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<OrganeGestion> partialUpdateOrganeGestion(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody OrganeGestion organeGestion
    ) throws URISyntaxException {
        log.debug("REST request to partial update OrganeGestion partially : {}, {}", id, organeGestion);
        if (organeGestion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, organeGestion.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!organeGestionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<OrganeGestion> result = organeGestionService.partialUpdate(organeGestion);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, organeGestion.getId().toString())
        );
    }

    /**
     * {@code GET  /organe-gestions} : get all the organeGestions.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of organeGestions in body.
     */
    @GetMapping("/organe-gestions")
    public ResponseEntity<List<OrganeGestion>> getAllOrganeGestions(Pageable pageable) {
        log.debug("REST request to get a page of OrganeGestions");
        if (SecurityUtils.hasCurrentUserThisAuthority("ROLE_ADMIN")) {
            Page<OrganeGestion> page = organeGestionService.findAll(pageable);
            HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
            return ResponseEntity.ok().headers(headers).body(page.getContent());
        }
        return ResponseEntity
            .ok()
            .headers(
                PaginationUtil.generatePaginationHttpHeaders(
                    ServletUriComponentsBuilder.fromCurrentRequest(),
                    (organeGestionService.findByUserIsCurrentUser(pageable))
                )
            )
            .body((organeGestionRepository.findByUserIsCurrentUser(pageable)).getContent());
    }

    /**
     * {@code GET  /organe-gestions/:id} : get the "id" organeGestion.
     *
     * @param id the id of the organeGestion to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the organeGestion, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/organe-gestions/{id}")
    public ResponseEntity<OrganeGestion> getOrganeGestion(@PathVariable Long id) {
        log.debug("REST request to get OrganeGestion : {}", id);
        Optional<OrganeGestion> organeGestion = organeGestionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(organeGestion);
    }

    /**
     * {@code DELETE  /organe-gestions/:id} : delete the "id" organeGestion.
     *
     * @param id the id of the organeGestion to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/organe-gestions/{id}")
    public ResponseEntity<Void> deleteOrganeGestion(@PathVariable Long id) {
        log.debug("REST request to delete OrganeGestion : {}", id);
        organeGestionService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
